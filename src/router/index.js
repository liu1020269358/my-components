import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Picker from '@/components/Picker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/',
      name: 'Picker',
      component: Picker
    }
  ]
})
