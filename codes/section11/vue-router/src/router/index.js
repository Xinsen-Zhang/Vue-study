import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '首页'
      },
      // component: index
      component: (resolve) => require(['@/components/index'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      // component: about
      meta: {
        title: '介绍页'
      },
      component: (resolve) => require(['@/components/about'], resolve)
    },
    {
      path: '/user/:id',
      name: 'user',
      meta: {
        title: '用户页'
      },
      component: resolve => require(['@/components/user'], resolve)
    },
    {
      path: '*',
      name: 'redirect',
      redirect: '/index'
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})


export default router
