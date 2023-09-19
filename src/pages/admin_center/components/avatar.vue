<template>
    <el-upload
      class="avatar-uploader"
      name="multipartFile"
      :headers="headerObj"
      action="/api/upload/image"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="'http://192.168.2.143:10067'+imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>
    </el-upload>

    <el-button @click="confirmChange">确认更换</el-button>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { UploadProps } from 'element-plus'
import { useUserStore } from '@/store/userStore';
import { useChangeAvatarApi } from '@/api/adminApi';
  

  const userStore = useUserStore()
  const headerObj = reactive({
    "Authorization": localStorage.getItem('token')
  })
  const imageUrl = ref(userStore.encapsulatedUserInfo.avatarUrl)
  
  
  const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    // multipartFile
  ) => {
    console.log(response)
    imageUrl.value = response.data
  }
  
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
    return true
  }

  const confirmChange = async ()=>{
    
    await useChangeAvatarApi({imageUrl:imageUrl.value})
    ElMessage.success("已更换")
  }
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  </style>@/api/adminApi