<script setup lang="ts">

import MenuItem from '@/pages/layout/menu/components/menuItem.vue'
import { PropType, computed } from 'vue';
import { useRoute } from 'vue-router';
import {MenuModel} from '@/model/menuModel'

const route = useRoute()


defineProps({
    menuList: {
        type: Array as PropType<MenuModel[]>,
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
    <el-menu class="menu-class" background-color="#2d3a4b" active-text-color="#ffd04b" text-color="#fff"
        :default-active="defaultActiveIndex">
        <MenuItem v-for="menu in menuList" :key="menu.id" :menu="menu" />
    </el-menu>
</template>

<style scoped></style>