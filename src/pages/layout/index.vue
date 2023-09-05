<script setup lang="ts">

import Menu from '@/pages/layout/menu/index.vue'
import BreadCrumb from '@/pages/layout/header/index.vue'
import Tabs from '@/pages/layout/tabs/index.vue'
import Footer from '@/pages/layout/footer/index.vue'
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()

</script>
<template>
    <div class="app-wrapper">
        <el-container>
            <el-aside class="sidebar-container">
                <Menu :menuList="userStore.menuList"></Menu>
            </el-aside>
            <el-container>
                <el-header>
                    <BreadCrumb></BreadCrumb>
                </el-header>
                <el-main>
                    <Tabs />
                    <!-- 路由出口 -->
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .sidebar-container {
        background-color: #2d3a4b;
        height: 100%;
        width: auto;
    }

    .el-container {
        height: 100%
    }

    .el-header {
        padding: 0 5px;
    }
}

.el-menu {
    border-right: 0px;
}</style>