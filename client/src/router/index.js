import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import Store from '@/components/Store'
import AboutUs from '@/components/About'
import Contact from '@/components/Contact'
import AdminPanel from '@/components/AdminPanel'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
