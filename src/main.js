// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//全局引进MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'
import router from './router'

// 引进element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(MintUI)

//图片懒加载
import lrz from 'lrz'  
Vue.prototype.lrz = lrz

import store from './store/'
// 引进Vuex
// import Vuex from 'vuex';
// Vue.use(Vuex);
// import actions from './store/action';
// import mutation from './store/mutation';
// export default new Vuex.Store({
// 	modules: {
// 		mutation
// 	},
// 	actions
// });

// // 返回唯一的一个Store实例 状态仓库
// const store = new Vuex.Store({
// 	// 状态
// 	state: {
// 		isLogin: false,
// 		userinfo: {}
// 	}
// })


// 引入echarts
import echarts from 'echarts'
import china from 'echarts/map/js/china.js'

Vue.prototype.$echarts = echarts 



// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
