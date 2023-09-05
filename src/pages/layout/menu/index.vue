<script setup lang="ts">

import MenuItem from '@/pages/layout/menu/components/menuItem.vue'

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()


defineProps({
    menuList: {
        type: Array,
        required: true
    }
})

const defaultActiveIndex = computed(() => {
    const { path } = route
    // console.log(' defaultActiveIndex path', path)
    // 菜单前面没有/，去掉/
    return path.substring(1)
})



</script>
<template>
    <el-menu  class="menu-class" background-color="#2d3a4b" active-text-color="#ffd04b" text-color="#fff"
        :default-active="defaultActiveIndex"
        >
        <MenuItem v-for="menu in menuList" :key="menu.authUrl" :menu="menu" />
    </el-menu>
</template>

<style scoped></style>