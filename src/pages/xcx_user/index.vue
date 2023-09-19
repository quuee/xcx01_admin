<script setup lang="ts">
import { useXcxUserListApi } from '@/api/xcxUserApi';
import { dateFormat } from '@/utils/dateFormat';
import { onMounted, reactive, ref } from 'vue';


const xcxUserTableData = ref([])

const queryForm = reactive({
    nickname: "",
    pageNo: 1,
    pageSize: 10
})

const total = ref(0)

const initXcxUserList = async () => {
    let [res, err] = await useXcxUserListApi(queryForm).then(res => [res, null]).catch(err => [null, err])
    xcxUserTableData.value = res.list
    total.value = res.total
}

onMounted(() => {
    initXcxUserList()
})

const gridDateFormatter = (row, column, cellValue, index) => {
    const dateSrc = row[column.property]
    return dateFormat(dateSrc)
}
const handleSizeChange = (pageSize:number)=>{
    queryForm.pageNo=1
    queryForm.pageSize=pageSize
    initXcxUserList()
}
const handleCurrentChange = (pageNo:number)=>{
    queryForm.pageNo = pageNo
    initXcxUserList()
}
</script>
<template>
    <div class="table-container">

        <el-row :gutter="20" >
            <el-col :span="7">
                <el-input placeholder="请输入昵称" v-model="queryForm.nickname" clearable></el-input>
            </el-col>
            <el-button type="primary" @click="initXcxUserList">
                <el-icon>
                    <i-ep-search/>
                </el-icon>
            </el-button>
        </el-row>

        <el-table :data="xcxUserTableData" stripe style="width: 100%">
            <el-table-column prop="nickName" label="用户名" width="180" />
            <el-table-column prop="openid" label="openid" width="180" />
            <el-table-column prop="avatarUrl" label="头像" >
                <template #default="scope">
                    <el-image style="width: 100px;height: 100px;" :src="scope.row.avatarUrl"></el-image>
                </template>
            </el-table-column>
            <el-table-column :formatter="gridDateFormatter" prop="registerDate" label="注册时间" />
            <el-table-column :formatter="gridDateFormatter" prop="lastLoginDate" label="最后登录时间" />
        </el-table>
        <el-pagination v-model:current-page="queryForm.pageNo" v-model:page-size="queryForm.pageSize"
            :page-sizes="[10, 20, 30, 50]" :small="true" :background="false" layout="sizes, prev, pager, next"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<style scoped></style>