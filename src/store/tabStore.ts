import { defineStore } from "pinia";

type Tab = {
    title?: string,
    path: string
}

export const useTabStore = defineStore("tabStore", {
    state: () => {
        return {
            cacheTabs: [
                {
                    title: '首页',
                    path: '/home'
                }
            ],


        }
    },
    getters: {

    },
    actions: {
        addTab(tab: Tab) {
            // console.log("useTabStore addTab",tab)
            const index = this.cacheTabs.findIndex(t => t.path === tab.path)
            if (index === -1) {
                //没找到则新建一个tab
                this.cacheTabs.push(
                    {
                        title: tab.title || "unkown",
                        path: tab.path
                    }
                )
            }

        },
        removeTab(path: string) {
            const removeIndex = this.cacheTabs.findIndex(t => t.path === path)
            this.cacheTabs.splice(removeIndex, 1)
            if (this.cacheTabs.length <= 0) {
                this.cacheTabs.push(
                    {
                        title: "首页",
                        path: "/home"
                    }
                )
            }
            return this.cacheTabs[removeIndex - 1 < 0 ? 0 : removeIndex - 1].path
        },
        removeAllTabs() {
            this.cacheTabs.length = 0
        }

    }
})