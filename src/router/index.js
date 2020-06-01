import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
