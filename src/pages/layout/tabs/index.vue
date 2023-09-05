<template>
  <el-tabs 
  v-model="activeTabPath" 
  type="card" 
  class="demo-tabs" 
  closable 
  @tab-click="tabClick" 
  @tab-remove="tabRemove">
    <el-tab-pane 
    v-for="item in tabStore.cacheTabs" 
    :key="item.path" 
    :label="item.title" 
    :name="item.path">

    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { useTabStore } from '@/store/tabStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabStore = useTabStore()
const activeTabPath = ref(route.path)


watch(route, () => {
  if (route.name) {
    addTab()
    activeTabPath.value = route.path

  }
})

const addTab = () => {
  tabStore.addTab({
    title: route.meta.title as string || route.name?.toString(),
    path: route.path
  })
}
// tab被选中
const tabClick = (tab: any) => {
  router.push(tab.props.name)

}
 
// 点击关闭tab
const tabRemove = (path: string) => {
	// console.log('点击关闭tab',path)
  const prePath = tabStore.removeTab(path)

  router.push(prePath)
}

const initTabs = ()=>{
  if(route.path){
    tabStore.removeAllTabs()
    addTab()
  }
}

onMounted(()=>{
  initTabs()
})


</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>