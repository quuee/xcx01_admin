
<template>
    <div class="admin-center-contaier">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <div class="admin-detail-info-wrap">
                        <div>
                            修改头像
                        </div>
                        <ul>
                            <li class="admin-detail-info-li">
                                用户名称
                                <div>{{ adminInfo.username }}</div>
                            </li>
                            <li class="admin-detail-info-li">
                                手机号
                                <div>{{ adminInfo.phone }}</div>
                            </li>
                            <li class="admin-detail-info-li">
                                邮箱
                                <div>{{ adminInfo.email }}</div>
                            </li>
                            <li class="admin-detail-info-li">
                                角色
                                <div>超级管理员</div>
                            </li>
                            <li class="admin-detail-info-li">
                                部门
                                <div>超级管理员</div>
                            </li>
                            <li class="admin-detail-info-li">
                                创建时间
                                <div>{{ dateFormat(adminInfo.createTime) }}</div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>基本资料</span>
                            
                        </div>
                    </template>
                    <el-tabs v-model="activeTab" type="border-card">
                        <el-tab-pane label="基本资料">
                            <updateAdminInfo :adminInfo="adminInfo"></updateAdminInfo>
                        </el-tab-pane>
                        <el-tab-pane label="修改密码">修改密码</el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { reactive, ref,watch } from 'vue';
import updateAdminInfo from '@/pages/admin_center/components/updateAdminInfo.vue'
import { dateFormat } from '@/utils/dateFormat'
import {  } from 'fs';

const activeTab = ref("基本资料")
const userStore = useUserStore()
const adminInfo = reactive(userStore.encapsulatedUserInfo)



</script>
<style lang="scss" scoped>
.admin-detail-info-li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    margin-top: 10px;
}
</style>