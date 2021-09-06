import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import NotFound from '@/views/404'
import Dashboard from '@/views/dashboard'
import MicroApp from '@/views/micro-app'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: ':user/:repo/*',
        name: 'microApp',
        component: MicroApp
      },
      {
        path: ':user/:repo',
        redirect: '/:user/:repo/'
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404' }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
