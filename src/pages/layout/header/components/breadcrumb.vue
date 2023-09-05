
<template>
    <el-breadcrumb separator="/" class="nav-breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <span>{{ item }}</span>
        </el-breadcrumb-item>

    </el-breadcrumb>
</template>
<script setup lang="ts">

import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const breadcrumbList = ref([])
const initBreacrumbList = () => {
    breadcrumbList.value = []
    // console.log(route.matched)
    route.matched.forEach((t) => {
        breadcrumbList.value.push(t.name)
    })

}

watch(route, () => {
    initBreacrumbList()
}, {
    deep: true,
    immediate: true
})

</script>
<style scoped lang="scss">
.nav-breadcrumb {
    height: 40px;
    overflow: hidden;
    background-color: #fff;
    // box-shadow: 0 1px 4px rgba(0, 21, 42, 0.08);
    display: flex;
}
</style>