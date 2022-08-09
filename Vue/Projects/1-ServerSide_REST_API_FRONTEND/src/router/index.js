import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ControlPointManagement from '../views/ControlPointManagement.vue'
import AccessGroups from '../views/AccessGroups.vue'
import StaffView from '../views/StaffView.vue'
import LoggingView from '../views/LoggingView.vue'
import SignInView from "../views/SignInView.vue"
import SignUpView from "../views/SignUpView.vue"
import AccessGroupManage from "../views/AccessGroupManage.vue"






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ControlPointManagement',
      component: ControlPointManagement
    },
    {
      path: '/access',
      name: 'AccessGroups',
      component: AccessGroups
    },
    {
      path: '/AccessGroupManage/:id',
      name: 'AccessGroupManage',
      component: AccessGroupManage
    },
    {
      path: '/staff',
      name: 'staff',
      component: StaffView
    },
    {
      path: '/logging',
      name: 'logging',
      component: LoggingView
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUpView
    },
  ]
})

export default router
