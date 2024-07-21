import { createRouter, createWebHistory } from "vue-router";
const routes = [
    /*  { path: '/:pathMatch(.*)*', component: () => import('@/views/error/notfound.vue') }, */
    { path: '/', name: 'home', component: () => import('@/views/home.vue'), meta: { } },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router