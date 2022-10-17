import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useAuthentication from '../composables/useAuthentication'

const { user } = useAuthentication()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/holders/AppHolder.vue'),
    children: [
      {
        path: '',
        component: () => import('../screens/Home.vue'),
        meta: { needsAuthentication: false },
      },
      {
        path: 'rooms',
        component: () => import('../screens/rooms/index.vue'),
        meta: { needsAuthentication: false },
      },
      {
        path: 'services',
        component: () => import('../screens/services/index.vue'),
        meta: { needsAuthentication: true },
      },
      {
        path: 'reservations',
        component: () => import('../screens/reservations/index.vue'),
        meta: { needsAuthentication: true },
      },
      {
        path: 'profile',
        component: () => import('../screens/Profile.vue'),
        meta: { needsAuthentication: true },
      },
    ],
  },
  {
    path: '/:pathMach(.*)*',
    name: 'ClientError',
    component: () => import('../screens/generic/ClientError.vue'),
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('../components/holders/AuthHolder.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../components/auth/Login.vue'),
        meta: { cantAuthentication: true },
      },
      {
        path: 'register',
        component: () => import('../components/auth/Register.vue'),
        meta: { cantAuthentication: true },
      },
      {
        path: 'forgot-password',
        component: () => import('../components/auth/ForgotPassword.vue'),
      },
    ],
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.meta.needsAuthentication && !user.value) return 'auth/login'

    if (to.meta.cantAuthentication && user.value) return '/'
  },
)

export default router
