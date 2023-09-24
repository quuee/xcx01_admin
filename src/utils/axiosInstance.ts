import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import {router} from '@/router'


// import { useUserStore } from '../store/userStore'
// import { Message } from 'element-plus'

const axiosInstance: AxiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL,
    //如果开启代理的话，不能写全路径
    baseURL: "/api",
    timeout: 30 * 1000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    },
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        // 在发送请求之前做些什么

        //添加请求头

        // const userStore = useUserStore()
        // config.headers.Authorization = `${userStore.getUserInfo.userInfo.token}`
        const token = localStorage.getItem("token")
        config.headers.Authorization = token

        // 追加时间戳，防止GET请求缓存
        if (config.method?.toUpperCase() === 'GET') {
            config.params = { ...config.params, t: new Date().getTime() }
        }

        return config;
    },
    (error: any) => {

        // 处理请求错误
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        if (response.status === 200) {
            
            switch (response.data.code) {
                case 493:
                    router.replace({ path: "/login", replace: true })
                    localStorage.removeItem("token")
                    break;
                case 401:
                    router.replace({ path: "/login", replace: true })
                    localStorage.removeItem("token")
                    break;
            }

        }

        return response;
    },
    (error: any) => {
        // 处理响应错误
        return Promise.reject(error);
    },
);

export default axiosInstance;
