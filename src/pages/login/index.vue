<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter()
const loginForm = reactive<LoginForm>({
    adminName: '',
    password: '',
    checked: false
})

type LoginForm = {
    adminName: string,
    password: string,
    checked: boolean
}

const rules = reactive<FormRules<LoginForm>>({
    adminName: [
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

const loginFormRef = ref<FormInstance>()

/** 挂载时加载本地存储的账号密码 */
const useLocalAccount = () => {
    // console.log(localStorage.getItem("account"), localStorage.getItem("password"))
    if (localStorage.getItem("account") && localStorage.getItem("password")) {
        loginForm.adminName = localStorage.getItem("account")!
        loginForm.password = localStorage.getItem("password")!
        loginForm.checked = true
    }
}

onMounted(() => {
    useLocalAccount()
})

const submitForm = async (formEl: FormInstance | undefined) => {
    // debugger
    if (!formEl) return
    // 记住账号密码
    if (loginForm.checked) {
        // 需要加密
        localStorage.setItem("account", loginForm.adminName)
        localStorage.setItem("password", loginForm.password)
    } else {
        localStorage.removeItem("account")
        localStorage.removeItem("password")
    }
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let [result, err] = await login(loginForm).then(res => [res, null]).catch(err => [null, err])
            if (result.code == 0) {
                localStorage.setItem("token", result.token);
                router.replace({ path: "/" })
            } else {
                ElMessage.error(result.msg)
            }
            if(result.statusCode==500){
                console.log(err)
            }
        } else {
            console.log('error submit!', fields)
            
        }
    })
}

</script>
<template>
    <div class="login-container">
        <div class="title-container">
            <h3>XCX01管理系统</h3>
        </div>
        <el-form ref="loginFormRef" :rules="rules" :model="loginForm" label-position="left" label-width="100px" status-icon>
            <el-form-item label="用户名:" prop="username">
                <el-input v-model="loginForm.adminName" placeholder="请输入用户名">
                    <template #suffix>
                        <i-ep-user></i-ep-user>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码">
                    <template #prefix>
                        <i-ep-lock></i-ep-lock>
                    </template>
                </el-input>
            </el-form-item>
            <div>
                <el-checkbox v-model="loginForm.checked">记住账号密码</el-checkbox>
            </div>
            <el-form-item>
                <el-button size="default" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    background-color: cadetblue;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;

    .title-container {
        margin-bottom: 30px;
    }

}

.el-form-item__content {

    .el-button {
        width: 100%;
    }
}
</style>