import {RouteRecordRaw} from "vue-router"

const Layouts = () => import("@/layouts/index.vue")

export function menuList(): Array<RouteRecordRaw> {
  return [
    {
      path: "/base/config",
      name: "基本配置",
      redirect: "",
      meta: {
        title: "基本配置",
        elIcon: "setting"
      },
      component: Layouts,
      children: [
        {
          path: "/base/config/LoginAccount",
          name: "登录账户管理",
          component: () => import("@/view/base/LoginAccount/index.vue"),
          meta: {
            title: "登录账户管理",
            elIcon: "user"
          }
        },
        {
          path: "/base/config/factory",
          name: "工厂管理",
          component: () => import("@/view/base/Factory/index.vue"),
          meta: {
            title: "工厂管理",
            elIcon: "House"
          }
        },
        {
          path: "/base/config/app",
          name: "APP管理",
          component: () => import("@/view/base/BaseApp/BaseAppIndex.vue"),
          meta: {
            title: "App管理",
            elIcon: "House"
          }
        }
      ]
    }
  ]
}
