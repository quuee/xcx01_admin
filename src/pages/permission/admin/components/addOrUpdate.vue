<template>
    <el-dialog v-model="dialogVisible" :title="form.aid < 0 ? '新增' : '修改'" width="30%" >

        <el-form ref="formRef" v-model="form" :rules="rules" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.adminName" :disabled="!(form.aid < 0)"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item label="手机" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useGetAdminInfoByIdApi } from '@/api/adminApi';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const dialogVisible = ref(false)
const form = reactive({
    aid: -1,
    adminName: "",
    password: "",
    phone: "",
    email: ""
})
const init = (aid?:number) =>{
    dialogVisible.value = true

    console.log('init',aid)
    if(aid != undefined && aid > 0  ){
        form.aid = aid
        //查询 并 填充表单数据
        getUser(aid)
    }
}




const rules = reactive({
    username: [
        { required: true, message: "请输入登录名", trigger: "blur" },
        { min: 3, max: 30, message: '长度 3 到 30', trigger: 'blur' }

    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        }
    ]
})

const getUser = async (aid:number)=>{
    let [res,err]  = await useGetAdminInfoByIdApi({aid}).then(res => [res,null]).catch(err=>[null,err])
    if(res.code == 0){
        form.aid = res.data.aid
        form.adminName = res.data.adminName
        form.phone = res.data.phone
        form.email = res.data.email
    }else{
        ElMessage.error(err)
    }
    
}

defineExpose({
	init
})

</script>

<style scoped lang="scss"></style>