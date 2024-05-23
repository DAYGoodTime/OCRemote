export const routers = [
  {
    path: "/",
    name: "Home",
    component: ()=> import("../pages/Home.vue"),
    meta: {
      icon: "fxemoji:2hearts",
      order: 0,
      text:"首页"
    },
  },
  {
    path: "/ae",
    name: "AE",
    component: ()=> import("../pages/AEManager.vue"),
    meta: {
      icon: "fxemoji:2hearts",
      order: 0,
      text:"AE管理"
    },
  },
];
