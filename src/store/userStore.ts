import { useMenuTreeApi } from "@/api/menuApi";
import { useGetAdminInfoApi } from "@/api/adminApi";

import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            userInfo: <AdminModel>{},
            menuList: [],
        }
    },
    getters: {
        
    },
    actions: {
        async getUserInfoAction() {
            let [result, err] = await useGetAdminInfoApi().then((result) => [result, null]).catch((err) => [null, err])
            this.userInfo = result.data
            console.log("getUserInfoAction", this.userInfo)
        },
        async getMenuListAction() {
            let [result, err] = await useMenuTreeApi(this.userInfo.aid).then((result) => [result, null]).catch((err) => [null, err])
            this.menuList = result.data
            console.log("getMenuListAction", this.menuList)
        },
        async setUserInfo(user:any){
            this.userInfo = user
        }

    }
})