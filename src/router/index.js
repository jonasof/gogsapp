import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Repositories from '@/components/Repositories'
import Repository from '@/components/Repository'

import gogsApi from '../lib/gogsApi'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/repositories',
      name: 'Repositories',
      component: Repositories,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/repository/:user/:repo',
      name: 'Repository',
      component: Repository,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

function redirectIfNotLoggedMiddleware (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!gogsApi.checkLogged()) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
}


function redirectIfLoggedMiddleware (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth === false)) {
    if (gogsApi.checkLogged()) {
      next({
        path: '/Repositories'
      })
    } else {
      next()
    }
  } else {
    next()
  }
}

router.beforeEach(redirectIfNotLoggedMiddleware)
router.beforeEach(redirectIfLoggedMiddleware)

export default router
