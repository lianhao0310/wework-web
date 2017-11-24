import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Article from '@/components/Article'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})
