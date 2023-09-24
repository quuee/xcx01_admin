<template>
    <el-form ref="updateUserFormRef" :model="udpateUserForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        size="default" status-icon>
        <el-form-item label="用户名" prop="name">
            <el-input v-model="udpateUserForm.adminName" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="udpateUserForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="udpateUserForm.email" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(updateUserFormRef)">
                提交
            </el-button>
            <el-button @click="resetForm(updateUserFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { useAddOrUpdateApi } from '@/api/adminApi';
import { useUserStore } from '@/store/userStore';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, onMounted, ref } from 'vue';

const userStore = useUserStore()
const props = defineProps({
    adminInfo: { type: Object, require: true, default: {} }
})

interface UpdateUserForm {
    aid: number,
    adminName: string,
    phone: string,
    email: string,

}

const udpateUserForm = reactive<UpdateUserForm>({
    aid: -1,
    adminName: "",
    phone: "",
    email: "",

})
const updateUserFormRef = ref<FormInstance>()
onMounted(() => {
    console.log("onMounted props.adminInfo",props.adminInfo)
    udpateUserForm.aid = props.adminInfo.aid
    udpateUserForm.adminName = props.adminInfo.adminName
    udpateUserForm.phone = props.adminInfo.phone
    udpateUserForm.email = props.adminInfo.email
})
const rules = reactive<FormRules<UpdateUserForm>>({
    adminName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    phone: [

        { required: true, min: 11, max: 11, message: 'Length should 11', trigger: 'blur' },
    ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
    console.log("submitForm", udpateUserForm)
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let [result,err] = await useAddOrUpdateApi(udpateUserForm).then(result =>[result,null]).catch(err=>[null,err])
            if(result.code == 0){
                ElMessage.success("success")
                userStore.setUserInfo(result.data)
            }else{
                ElMessage.warning(result.msg)
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