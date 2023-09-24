<template>
    <el-form ref="updatePasswordFormRef" :model="udpatePasswordForm" :rules="rules" label-width="120px"
        class="demo-ruleForm" size="default" status-icon>
        <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="udpatePasswordForm.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="udpatePasswordForm.newPassword" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPassword" >
            <el-input v-model="udpatePasswordForm.confirmNewPassword" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(updatePasswordFormRef)">
                提交
            </el-button>
            <el-button @click="resetForm(updatePasswordFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import {  useUpdatePasswordApi } from '@/api/adminApi';

import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    adminInfo: { type: Object, require: true, default: {} }
})

interface UpdatePasswordForm {
    aid: number,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,

}

const udpatePasswordForm = reactive<UpdatePasswordForm>({
    aid: -1,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",

})
const updatePasswordFormRef = ref<FormInstance>()
onMounted(() => {
    console.log("onMounted props.adminInfo", props.adminInfo)
    udpatePasswordForm.aid = props.adminInfo.aid

})
const rules = reactive<FormRules<UpdatePasswordForm>>({
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },

    ],
    newPassword: [

        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    confirmNewPassword: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
    ]

})

const submitForm = async (formEl: FormInstance | undefined) => {
    console.log("submitForm", udpatePasswordForm)
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {

            //判断新密码和确认新密码一致

            //发送后端修改
            let [result, err] = await useUpdatePasswordApi(udpatePasswordForm).then(result => [result, null]).catch(err => [null, err])
            if(result.code == 500 ){
                ElMessage.warning(result.msg)
            }else{
                ElMessage.success(result.msg)
                //删除token
                localStorage.removeItem("token")
                //跳转到登陆
                router.replace('/login')
            }


        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<style scoped lang="scss"></style>@/api/adminApi