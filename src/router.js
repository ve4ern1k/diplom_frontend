import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'
import authorization from './views/authorization.vue'
import me from './views/me.vue'
import staff from './views/staff.vue'
import staffGroups from './views/staffGroups.vue'
import orders from './views/orders.vue'
import publications from './views/publications.vue'
import userSettings_test from './userSettings_test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: `/${userSettings_test.startPageRouter}`
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: authorization
  },
  {
    path: '/me',
    name: 'me',
    component: me,
    meta: { requiresAuth: true },
  },
  {
    path: '/staff',
    name: 'staff',
    component: staff,
    meta: { requiresAuth: true },
  },
  {
    path: '/staffGroups',
    name: 'staffGroups',
    component: staffGroups,
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'orders',
    component: orders,
    meta: { requiresAuth: true },
  },
  {
    path: '/publications',
    name: 'publications',
    component: publications,
    meta: { requiresAuth: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth) {
      next({ name: 'authorization' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router