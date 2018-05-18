import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Index from '@/components/index'
import Location from '@/components/location'
import Search from '@/components/search'
import Quality from '@/components/quality'
import Order from '@/components/order'
import Mine from '@/components/mine'
import Tabber from '@/components/tabber'
import Login from '@/components/login'
import Goods from '@/components/goods'
import GoLogin from '@/components/goLogin'
import EditNews from '@/components/editNews'
import Edit from '@/components/edit'
import Evaluate from '@/components/evaluate'
import Pie from '@/components/pie'
import EchartList from '@/components/echartList'
import Bar from '@/components/bar'
import About from '@/components/about'
import Mycollect from '@/components/mycollect'
import Footprint from '@/components/footprint'
import Map from '@/components/map'


Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/tabber/index',
    // },
    // {
    //   path: '/tabber',
    //   component: Tabber,
    //   children: [
    //     {
    //       path: 'index', 
    //       component: Index, 
    //     },
    //     {
    //       path: 'location', 
    //       component: Location, 
    //     },
    //     {
    //       path: 'search', 
    //       component: Search, 
    //     },
    //     {
    //       path: 'quality', 
    //       component: Quality, 
    //     },
    //     {
    //       path: 'order', 
    //       component: Order, 
    //     },
    //     {
    //       path: 'mine', 
    //       component: Mine, 
    //     }
    //   ]
    // }
    // ,
    {
      path: '/',
      name: 'tabber',
      component: Tabber,
    },
    {
      path: '/location', 
      component: Location, 
    },
    {
      path: '/search', 
      component: Search, 
    },
    {
      path: '/login', 
      component: Login, 
    },
    {
      path: '/quality', 
      component: Quality, 
    },
    {
      path: '/order', 
      component: Order, 
    },
    {
      path: '/mine', 
      component: Mine, 
    },
    {
      path: '/goods', 
      component: Goods,
    },
    {
      path: '/goLogin', 
      component: GoLogin,
    },
    {
      path: '/editNews', 
      component: EditNews,
    },
    {
      path: '/edit', 
      component: Edit,
    },
    {
      path: '/evaluate', 
      component: Evaluate,
    },
    {
      path: '/pie', 
      component: Pie,
    },
    {
      path: '/echartList', 
      component: EchartList,
    },
    {
      path: '/bar', 
      component: Bar,
    },
    {
      path: '/about', 
      component: About,
    },
    {
      path: '/mycollect', 
      component: Mycollect,
    },
    {
      path: '/footprint', 
      component: Footprint,
    },
    {
      path: '/map', 
      component: Map,
    }
  ]
})
