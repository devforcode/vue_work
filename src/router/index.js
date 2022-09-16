import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Index.vue"),
    children: [
      {
        path: "/",
        name: "DashBoard",
        component: () => import("@/views/DashBoard.vue"),
        meta: { title: "대시보드" },
      },
      {
        path: "/system/CommCode",
        name: "CommCode",
        component: () => import("@/views/system/CommCode.vue"),
        meta: { title: "공통코드 관리" },
      },
      {
        path: "/system/usersAuth",
        name: "UsersAuth",
        component: () => import("@/views/system/UsersAuth.vue"),
        meta: { title: "사용자 권한관리" },
      },
      {
        path: "/system/standardInfo",
        name: "StandardInfo",
        component: () => import("@/views/system/StandardInfo.vue"),
        meta: { title: "기준정보" },
      },
      {
        path: "/quality/dashboard/kpi/QualityMonitoring",
        name: "QualityMonitoring",
        component: () =>
          import("@/views/quality/dashboard/kpi/QualityMonitoring.vue"),
        meta: { title: "일일 통합 품질현황 모니터링" },
      },
    ],
  },
];

const router = new VueRouter({
  mmode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
