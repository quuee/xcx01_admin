import { useMenuTreeApi } from "@/api/menuApi";
import { useGetAdminInfoApi } from "@/api/adminApi";

import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            userInfo: {},
            menuList: [],
        }
    },
    getters: {
        encapsulatedUserInfo(state){
            return {
                userId : state.userInfo.id || -1,
                username : state.userInfo.username || "",
                avatarUrl: state.userInfo.avatarUrl || "",
                phone: state.userInfo.phone || "",
                email: state.userInfo.email || "",
                job: state.userInfo.job || "",
                role: state.userInfo.role || "",
                createTime: state.userInfo.createTime || ""
            }
        }
    },
    actions: {
        async getUserInfoAction() {
            let [result, err] = await useGetAdminInfoApi().then((result) => [result, null]).catch((err) => [null, err])
            this.userInfo = result.data
            console.log("getUserInfoAction", this.userInfo)
        },
        async getMenuListAction() {
            let [result, err] = await useMenuTreeApi(this.encapsulatedUserInfo.userId).then((result) => [result, null]).catch((err) => [null, err])
            this.menuList = result.data
            console.log("getMenuListAction", this.menuList)
        },
        async setUserInfo(user:any){
            this.userInfo = user
        }

    }
})