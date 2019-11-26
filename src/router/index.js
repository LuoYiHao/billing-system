import Vue from 'vue'
import Router from 'vue-router'
import CountMoney from '@/components/CountMoney'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CountMoney',
      component: CountMoney
    }
  ]
})
