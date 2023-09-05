import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store/userStore'
import { h } from 'vue'

/** 公共路由 */
const publicRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/index.vue')
    },

    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/not_found/404.vue')
    },


]

/** 动态路由，基于用户权限动态去加载 */
const dynamicRoutes: RouteRecordRaw = {
    path: '/',
    name: 'layout',
    component: () => import('@/pages/layout/index.vue'),
    redirect: '/home',
    children: [
        {
			path: '/home',
			name: '首页',
			component: () => import('@/pages/home/index.vue'),
		},
        {
			path: '/adminCenter',
			name: '个人中心',
			component: () => import('@/pages/admin_center/index.vue'),
		},
    ]
}


// 白名单列表
const whiteList = ['/login', '/404']


export const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRoutes
})

// 全局前置守卫 路由跳转前
router.beforeEach(async (to, from, next) => {

    const userStore = useUserStore()
    const token = localStorage.getItem("token")
    // token存在的情况
    if (token) {
        // debugger
        if (to.path === '/login') {
            next('/')
        } else {
            // 如果用户路由信息不存在，则重新拉取
            if (userStore.encapsulatedUserInfo.userId <= -1) {
                try{
                    await userStore.getUserInfoAction()
                    await userStore.getMenuListAction()
                }catch(error){
                    localStorage.removeItem('token')
					next('/login')
					return Promise.reject(error)
                }
                
                const menuRoutes = generateRoutes(userStore.menuList)

                dynamicRoutes.children?.push(...menuRoutes)
                router.addRoute(dynamicRoutes)


                next({ ...to, replace: true })
            } else {
                next()
            }

        }
    } else {
        // 没有token的情况下，可以进入白名单
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
})
// 获取vue的组件
const layoutModules = import.meta.glob('/src/pages/**/*.vue')
// 根据路径，动态获取vue组件
const getDynamicComponent = (path: string): any => {
    // console.log(layoutModules)
	return layoutModules[`/src/pages/${path}/index.vue`]
}

// 根据菜单列表，生成路由数据
const generateRoutes = (menuList: any): RouteRecordRaw[] => {
    const routeList: RouteRecordRaw[] = []
    menuList.forEach((menu: any) => {
        let path;
        let component;
        //动态生成组件
        if (menu.subMenu && menu.subMenu.length > 0) {
            path = '/p/' + menu.id;
            // component = () => import('@/pages/layout/index.vue');
        } else {
            path = "/" + menu.authUrl;
            component = getDynamicComponent(menu.authUrl);
        }
        
        //生成路由
        const route: RouteRecordRaw = {
            path: path,
            name: menu.menuName,
            component: component,
            children: [],
            meta: {
                title: menu.menuName,
                icon:  menu.icon,
                id: '' + menu.id,
                url: menu.authUrl,
                breadcrumb: [menu.menuName]
            }
        }
        if (menu.subMenu && menu.subMenu.length > 0) {
            route.children?.push(...generateRoutes(menu.subMenu))
        }
        // 加入到路由
        routeList.push(route)
    });
    return routeList;
}