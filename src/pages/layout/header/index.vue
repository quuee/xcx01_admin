<script setup lang="ts">
import BreadCrumb from '@/pages/layout/header/components/breadcrumb.vue'
import Avatar from '@/pages/layout/header/components/avatar.vue'
</script>
<template>
    <div class="header_container">
        <BreadCrumb />
        <Avatar />
    </div>
    
</template>
<style scoped lang="scss">

.header_container{
    display: flex;
    height: 60px;
    padding: 5px 15px 5px 20px ;
    justify-content: space-between;
}

</style>