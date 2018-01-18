import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Picker from '@/components/Picker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/Picker',
      name: 'Picker',
      component: Picker
    }
  ]
})
