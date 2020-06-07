import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    alias: '/dashboard',
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('../views/Rooms.vue'),
  },
  {
    path: '/scenes',
    name: 'Scenes',
    component: () => import('../views/Scenes.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings/Settings.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
