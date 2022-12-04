import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/day01',
      name: 'day01',
      component: () => import('../views/Day01View.vue'),
    },
    {
      path: '/day02',
      name: 'day02',
      component: () => import('../views/Day02View.vue'),
    },
  ],
});

export default router;
