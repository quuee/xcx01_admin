<script setup lang="ts">
import { useAdminUserListApi } from '@/api/adminApi';
import { dateFormat } from '@/utils/dateFormat';
import { onMounted, reactive, ref } from 'vue';
import AddOrUpdate from '@/pages/permission/admin/components/addOrUpdate.vue'

const adminUserTableData = ref([])

const queryForm = reactive({
    nickname: "",
    pageNo: 1,
    pageSize: 10
})

const total = ref(0)



const initAdminUserList = async () => {
    let [res, err] = await useAdminUserListApi(queryForm).then(res => [res, null]).catch(err => [null, err])
    adminUserTableData.value = res.data.list
    total.value = res.data.total
}

onMounted(() => {
    initAdminUserList()
})

const gridDateFormatter = (row:any, column:any, cellValue, index) => {
    const dateSrc = row[column.property]
    return dateFormat(dateSrc)
}
const handleSizeChange = (pageSize: number) => {
    queryForm.pageNo = 1
    queryForm.pageSize = pageSize
    initAdminUserList()
}
const handleCurrentChange = (pageNo: number) => {
    queryForm.pageNo = pageNo
    initAdminUserList()
}

const addOrUpdateRef = ref()

const handleAddOrUpdateDialog = (aid?:number)=>{
    // console.log("handleAddOrUpdateDialog",id)
    // if(id > 0){
    //     userId.value = id
    //     dialogTitle.value="用户修改"
    // }else{
    //     userId.value = -1
    //     dialogTitle.value="新增用户"
    // }
    // dialogVisible.value = true
    console.log('handleAddOrUpdateDialog',aid)
    addOrUpdateRef.value.init(aid)
}
</script>
<template>
    <div class="table-container">

        <el-row :gutter="20">
            <el-col :span="7">
                <el-input placeholder="请输入昵称" v-model="queryForm.nickname" clearable></el-input>
            </el-col>

            <el-button type="primary" @click="initAdminUserList">
                <el-icon>
                    <i-ep-search />
                </el-icon>
            </el-button>

            <el-button type="primary" @click="handleAddOrUpdateDialog(-1)">
                <i-ep-plus />新增
            </el-button>
        </el-row>

        <el-table :data="adminUserTableData" stripe style="width: 100%">
            <el-table-column prop="adminName" label="用户名" width="180" />
            <el-table-column prop="avatarUrl" label="头像">
                <template #default="scope">
                    <el-image style="width: 100px;height: 100px;"
                        :src="'http://192.168.2.143:10067' + scope.row.avatarUrl"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column :formatter="gridDateFormatter" prop="createTime" label="创建时间" />

            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <el-button type="primary" size="small">Detail</el-button>
                    <el-button type="primary" size="small" @click="handleAddOrUpdateDialog(scope.row.aid)">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="queryForm.pageNo" v-model:page-size="queryForm.pageSize"
            :page-sizes="[10, 20, 30, 50]" :small="true" :background="false" layout="sizes, prev, pager, next"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <AddOrUpdate ref="addOrUpdateRef" />
</template>

<style scoped></style>