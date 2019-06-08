import Vue from 'vue'
import Router from 'vue-router'
import Servers from '@/components/Servers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Servers
    },
    {
      path: '/Servers',
      name: 'Servers',
      component: Servers
    }
  ]
})
