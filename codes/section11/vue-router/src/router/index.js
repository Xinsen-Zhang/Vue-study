import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      // component: index
      component: (resolve) => require(['@/components/index'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      // component: about
      component: (resolve) => require(['@/components/about'], resolve)
    },
    {
      path: '/user/:id',
      name: 'user',
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
