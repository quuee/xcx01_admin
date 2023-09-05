<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})

const { circleUrl } = toRefs(state)
</script>
<template>
    <el-dropdown trigger="click">
        <span>
            <el-avatar :size="40" :src="circleUrl" />
            &nbsp;&nbsp;admin<el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
        </span>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>
                    <RouterLink to="/adminCenter">个人中心</RouterLink>
                </el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>

            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<style scoped lang="scss">
a {
    text-decoration: none;
    color: #000;
}

.router-link-active {
    text-decoration: none;
    color: red;
}
</style>