import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Repositories from '@/components/Repositories'
import Repository from '@/components/Repository'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/repositories',
      name: 'Repositories',
      component: Repositories
    },
    {
      path: '/repository/:user/:repo',
      name: 'Repository',
      component: Repository,
      props: true
    }
  ]
})
