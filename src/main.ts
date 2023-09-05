import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
// import ElementPlus from 'element-plus' 用按需引入方式，完整引入注释ing
import 'element-plus/dist/index.css'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')

