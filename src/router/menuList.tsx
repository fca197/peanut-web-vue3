const Layouts = () => import("@/layouts/index.vue")

export function menuList() {
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
          path: "/base/config/BaseSupplier",
          name: "供应商",
          component: () => import("@/view/base/BaseSupplier/BaseSupplierIndex.vue"),
          meta: {
            title: "供应商",
            elIcon: "UserFilled"
          }
        },
        {
          path: "/base/config/Dictionary",
          name: "字典",
          component: () => import("@/view/base/Dictionary/DictionaryIndex.vue"),
          meta: {
            title: "字典",
            elIcon: "Reading"
          }
        },
        {
          path: "/base/config/Shift",
          name: "班次",
          component: () => import("@/view/base/Shift/ShiftIndex.vue"),
          meta: {
            title: "班次",
            elIcon: "Coin"
          }
        },
        {
          path: "/base/config/ApsLogisticsPath",
          name: "物流路径",
          component: () => import("@/view/base/ApsLogisticsPath/ApsLogisticsPathIndex.vue"),
          meta: {
            title: "物流路径",
            elIcon: "Operation"
          }
        },
        {
          path: "/base/config/BaseResource",
          name: "菜单",
          component: () => import("@/view/base/BaseResource/BaseResourceIndex.vue"),
          meta: {
            title: "菜单",
            elIcon: "Menu"
          }
        },
        {
          path: "/base/config/BaseReportConfigUser",
          name: "用户报表",
          component: () => import("@/view/base/BaseReportConfigUser/BaseReportConfigUserIndex.vue"),
          meta: {
            title: "用户报表",
            elIcon: "Notebook"
          }
        },
        {
          path: "/base/config/BaseReportConfig",
          name: "报表",
          component: () => import("@/view/base/BaseReportConfig/BaseReportConfigIndex.vue"),
          meta: {
            title: "报表",
            elIcon: "Grid"
          }
        },
        {
          path: "/base/config/BaseOplog",
          name: "日志",
          component: () => import("@/view/base/BaseOplog/BaseOplogIndex.vue"),
          meta: {
            title: "日志",
            elIcon: "Memo"
          }
        },
        {
          path: "/base/config/ApsStatus",
          name: "状态",
          component: () => import("@/view/base/ApsStatus/ApsStatusIndex.vue"),
          meta: {
            title: "状态",
            elIcon: "Soccer"
          }
        },
        {
          path: "/base/config/ApsWorkshopStation",
          name: "工位",
          component: () => import("@/view/base/ApsWorkshopStation/ApsWorkshopStationIndex.vue"),
          meta: {
            title: "工位",
            elIcon: "Aim"
          }
        },
        {
          path: "/base/config/ApsWorkshopSection",
          name: "工段",
          component: () => import("@/view/base/ApsWorkshopSection/ApsWorkshopSectionIndex.vue"),
          meta: {
            title: "工段",
            elIcon: "SemiSelect"
          }
        },
        {
          path: "/base/config/ApsRoom",
          name: "工作车间",
          component: () => import("@/view/base/ApsRoom/ApsRoomIndex.vue"),
          meta: {
            title: "工作车间",
            elIcon: "House"
          }
        },
        {
          path: "/base/config/BaseTableHeader",
          name: "动态表头",
          component: () => import("@/view/base/BaseTableHeader/BaseTableHeaderIndex.vue"),
          meta: {
            title: "动态表头",
            elIcon: "Coin"
          }
        },
        {
          path: "/base/config/LoginAccount",
          name: "登录账户",
          component: () => import("@/view/base/LoginAccount/index.vue"),
          meta: {
            title: "登录账户",
            elIcon: "user"
          }
        },
        {
          path: "/base/config/app",
          name: "APP",
          component: () => import("@/view/base/BaseApp/BaseAppIndex.vue"),
          meta: {
            title: "App",
            elIcon: "Compass"
          }
        },
        {
          path: "/base/config/BaseAppResource",
          name: "APP菜单",
          component: () => import("@/view/base/BaseAppResource/BaseAppResourceIndex.vue"),
          meta: {
            title: "App菜单",
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
          name: "商品",
          component: () => import("@v/base/ApsGoods/ApsGoodsIndex.vue"),
          meta: {
            title: "商品",
            elIcon: "List"
          }
        },
        {
          path: "/base/config/Factory",
          name: "工厂",
          component: () => import("@/view/base/Factory/FactoryIndex.vue"),
          meta: {
            title: "工厂",
            elIcon: "OfficeBuilding"
          }
        },
        {
          path: "/base/config/ApsGoodsBom",
          name: "商品零件",
          component: () => import("@v/base/ApsGoodsBom/ApsGoodsBomIndex.vue"),
          meta: {
            title: "商品零件",
            elIcon: "SwitchFilled"
          }
        },
        {
          path: "/base/config/ApsMachine",
          name: "机器",
          component: () => import("@v/base/ApsMachine/ApsMachineIndex.vue"),
          meta: {
            title: "机器",
            elIcon: "Connection"
          }
        },
        {
          path: "/base/config/DistrictCode",
          name: "区域编码",
          component: () => import("@v/base/DistrictCode/DistrictCodeIndex.vue"),
          meta: {
            title: "区域编码",
            elIcon: "Location"
          }
        },
        {
          path: "/base/config/Calendar",
          name: "日历",
          component: () => import("@v/base/Calendar/CalendarIndex.vue"),
          meta: {
            title: "日历",
            elIcon: "Calendar"
          }
        }
      ]
    }
  ]
}
