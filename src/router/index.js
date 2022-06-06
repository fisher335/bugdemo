import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import map from '@/views/map'
import bar from '@/views/bar'
import about from '../views/about'
import demo from '../views/demo'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/bar',
      name: 'bar',
      component: bar
    }
  ]
})
