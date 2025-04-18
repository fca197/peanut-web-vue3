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
          path: "/base/config/app",
          name: "APP管理",
          component: () => import("@/view/base/BaseApp/BaseAppIndex.vue"),
          meta: {
            title: "App管理",
            elIcon: "Compass"
          }
        },
        {
          path: "/base/config/BaseAppResource",
          name: "APP菜单管理",
          component: () => import("@/view/base/BaseAppResource/BaseAppResourceIndex.vue"),
          meta: {
            title: "App菜单管理",
            elIcon: "Memo"
          }
        },
        {
          path: "/base/config/ApsBomGroup",
          name: "零件组",
          component: () => import("@v/base/ApsBomGroup/ApsBomGroupIndex.vue"),
          meta: {
            title: "零件组",
            elIcon: "Files"
          }
        },
        {
          path: "/base/config/ApsBom",
          name: "零件",
          component: () => import("@v/base/ApsBom/ApsBomIndex.vue"),
          meta: {
            title: "零件",
            elIcon: "setting"
          }
        },
        {
          path: "/base/config/ApsBomSupplier",
          name: "零件供应商",
          component: () => import("@v/base/ApsBomSupplier/ApsBomSupplierIndex.vue"),
          meta: {
            title: "零件供应商",
            elIcon: "Avatar"
          }
        },
        {
          path: "/base/config/ApsGoods",
          name: "商品管理",
          component: () => import("@v/base/ApsGoods/ApsGoodsIndex.vue"),
          meta: {
            title: "商品管理",
            elIcon: "List"
          }
        },
        {
          path: "/base/config/TFactory",
          name: "工厂管理",
          component: () => import("@v/base/TFactory/TFactoryIndex.vue"),
          meta: {
            title: "工厂管理",
            elIcon: "House"
          }
        }
      ]
    }
  ]
}
