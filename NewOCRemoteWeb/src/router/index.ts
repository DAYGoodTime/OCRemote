import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes:RouteRecordRaw[] = [
  { path: "/", component: ()=> import("@/pages/Home.vue"),
    children:[
      {path:'', redirect:{name:"AEManager"} },
      {path:'ae', name:"AEManager" ,component: ()=> import("@/pages/AEManager.vue")},
      {path:'order',name:"Order",component: ()=>import("@/pages/Order.vue")},
      {path: '/order/:id',component: ()=>import("@/pages/OrderDetial.vue"),props:true,meta:{activePath:'Order'}}
    ]
   },
  { path: "/test", component: ()=>import("@/pages/test2.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router