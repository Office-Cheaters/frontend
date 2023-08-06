import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../view/Main.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../view/Login.vue"),
    },
    {
      path: "/social_login/callback",
      name: "social_login_callback",
      component: () => import("@/components/Login/LoginCallback.vue"),
    },
  ],
});

export default router;
