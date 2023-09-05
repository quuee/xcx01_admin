<template>
    <el-sub-menu v-if="menu.subMenu.length > 0" :key="'/p/'+menu.authUrl" :index="menu.authUrl">
        <template #title>
            <el-icon>
                <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.menuName }}</span>
        </template>
        <menu-item v-for="sub in menu.subMenu" :key="sub.authUrl" :menu="sub"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :key="menu.authUrl" :index="menu.authUrl" 
    @click="handleClickMenu(menu)" @select="handleMenuSelect">

        <template #title>
            <el-icon>
                <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.menuName }}</span>
        </template>
    </el-menu-item>
</template>
<script lang="ts" setup>
// import { useIconStore } from '@/store/iconStore';
import { PropType } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
defineProps({
    menu: {
        type: Object as PropType<any>,
        required: true
    }
})
// 菜单点击事件
const handleClickMenu = (menu: any) => {
    // 不是新开页面，则直接切换路由
    router.push('/'+menu.authUrl)
    return
}
const handleMenuSelect =(key :any,keyPath :any)=>{
    console.log(" handleMenuSelect key",key," handleMenuSelect keyPath",keyPath)
}

</script>
<style lang="ts" scoped>
</style>
