export default [
  {
    path: "/",
    name: "home",
    redirect: "/base/Button",
    component: () => import("../../views/Home.vue"),
    children: [
      {
        path: "base",
        redirect: "Button",
        component: () => import("../../views/HomeClassified.vue"),

        children: [
          {
            path: "button",
            name: "Button",
            component: () => import("../../../packages/button/doc/doc.md"),
          },
          {
            path: "Icon",
            name: "Icon",
            component: () => import("../../../packages/icon/doc/doc.md"),
          },
        ],
      },
      {
        path: "layout",
        redirect: "Row",
        component: () => import("../../views/HomeClassified.vue"),
        children: [
          {
            path: "Row",
            name: "Row",
            component: () => import("../../../packages/rowAcol/doc/doc.md"),
          },

          
          {
            path: "grid",
            name: "Grid",
            component: () => import("../../../packages/grid/doc/doc.md"),
          },
          {
            path: "Card",
            name: "Card",
            component: () => import("../../../packages/card/doc/doc.md"),
          },
          {
            path: "List",
            name: "List",
            component: () => import("../../../packages/List/doc/doc.md"),
          },
          {
            path: "descriptionList",
            name: "DescriptionList",
            component: () =>
              import("../../../packages/descriptionList/doc/doc.md"),
          },
          {
            path: "pageHeader",
            name: "PageHeader",
            component: () => import("../../../packages/pageHeader/doc/doc.md"),
          },
          {
            path: "GlobalFooter",
            name: "GlobalFooter",
            component: () =>
              import("../../../packages/GlobalFooter/doc/doc.md"),
          },
          {
            path: "Divider",
            name: "Divider",
            component: () => import("../../../packages/divider/doc/doc.md"),
          },
          {
            path: "Cell",
            name: "Cell",
            component: () => import("../../../packages/cell/doc/doc.md"),
          },
          {
            path: "collapse",
            name: "Collapse",
            component: () => import("../../../packages/collapse/doc/doc.md"),
          },
          {
            path: "footertoolbar",
            name: "FooterToolbar",
            component: () =>
              import("../../../packages/footerToolbar/doc/doc.md"),
          },
        ],
      },
      {
        path: "navigation",
        redirect: "Menu",
        component: () => import("../../views/HomeClassified.vue"),
        children: [
          {
            path: "menu",
            name: "Menu",
            component: () => import("../../../packages/menu/doc/doc.md"),
          },
          {
            path: "Page",
            name: "Page",
            component: () => import("../../../packages/Page/doc/doc.md"),
          },
          
          {
            path: "Breadcrumb",
            name: "Breadcrumb",
            component: () => import("../../../packages/breadcrumb/doc/doc.md"),
          },
          {
            path: "loadingBar",
            name: "LoadingBar",
            component: () => import("../../../packages/loadingBar/doc/doc.md"),
          },
          {
            path: "badge",
            name: "Badge",
            component: () => import("../../../packages/badge/doc/doc.md"),
          },
          // 未完成
          // {
          //   path: "Anchor",
          //   name: "Anchor",
          //   component: () => import("../../../packages/anchor/doc/doc.md"),
          // },
        ],
      },
      {
        path: "form",
        redirect: "Table",
        component: () => import("../../views/HomeClassified.vue"),
        children: [
          {
            path: "table",
            name: "Table",
            component: () => import("../../../packages/table/doc/doc.md"),
          },
          
          {
            path: "Switch",
            name: "Switch",
            component: () => import("../../../packages/switch/doc/doc.md"),
          },
        ],
      },
      {
        path: "view",
        redirect: "Progress",
        component: () => import("../../views/HomeClassified.vue"),
        children: [
         
        ],
      },
    ],
  },
];
