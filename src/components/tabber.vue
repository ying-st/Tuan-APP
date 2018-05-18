<template>
  <div class="tabber"> 
	    <!-- 底部导航切换页 -->  
	    <mt-tab-container class="page-tabbar-container" v-model="selected">  
	      <mt-tab-container-item id="tab1">  
	        <Index></Index>
	      </mt-tab-container-item>  
	      <mt-tab-container-item id="tab2">  
	        <Quality></Quality>
	      </mt-tab-container-item>  
	      <mt-tab-container-item id="tab3" v-if="login">  
	        <Order></Order>
	      </mt-tab-container-item>  
	      <mt-tab-container-item id="tab3" v-else>  
	        <GoLogin></GoLogin>
	      </mt-tab-container-item> 
	      <mt-tab-container-item id="tab4">  
	        <Mine></Mine>
	      </mt-tab-container-item>  
	    </mt-tab-container>  


  	<!-- 底部导航  -->
		<mt-tabbar fixed v-model="selected">
		<div class="tab" @click="a">
		<mt-tab-item id="tab1">
		  <i slot="icon" class="fa fa-envira" aria-hidden="true"></i>
		  首页
		</mt-tab-item>
		</div>
		<div class="tab" @click="b">
		<mt-tab-item id="tab2">
		  <i slot="icon" class="fa fa-diamond" aria-hidden="true"></i>
		  品质优惠
		</mt-tab-item>
		</div>
		<div class="tab" @click="islogin">
		<mt-tab-item id="tab3">
		  <i slot="icon" class="fa fa-history" aria-hidden="true"></i>
		  订单
		</mt-tab-item>
		</div>
		<div class="tab" @click="c">
		<mt-tab-item id="tab4">
		  <i slot="icon" class="fa fa-user-circle-o" aria-hidden="true"></i>
		  我的
		</mt-tab-item>
		</div>
		</mt-tabbar>
		
  </div>
</template>

<script>
import Index from './index'
import Quality from './quality'
import Order from './order'
import GoLogin from './goLogin'
import Mine from './mine'
import {mapGetters,mapActions} from 'vuex' 
import { MessageBox } from 'mint-ui';


export default {   
  name: 'tabber',
  components: { Index, Quality, Order, GoLogin, Mine },
  data () {  
    return {  
    	selected: '',
    }
  },
  destroyed: function () {
  	// 订单信息倒序处理，恢复原来排序
    this.$store.state.mutation.buyinfo.reverse();
    this.$store.state.mutation.beconsum.reverse();
    this.$store.state.mutation.Alconsum.reverse();
  },
  methods: {
    islogin (){
      if (this.$store.state.mutation.isLogin){
        this.$store.dispatch("setTab", 'tab3')
        console.log('tab3')
        this.$router.push({
          path: '/'
        })
      }else {
		MessageBox.confirm('请先登录','提示').then(action => {
		  this.$router.push({path:'/login'})
		}).catch(() => {
			this.$router.push({path:'/'})
		});
      }
	},

	a(){
		this.$store.dispatch("setTab", 'tab1')
		console.log('tab1')
	},
	b(){
		this.$store.dispatch("setTab", 'tab2')
		console.log('tab2')
	},
	c(){
		this.$store.dispatch("setTab", 'tab4')
		console.log('tab4')
	}
  },
  mounted:function(){  
    this.isLogin = this.$store.state.mutation.isLogin
    this.selected = this.$store.state.mutation.tab
  },  
  computed: mapGetters(['login','username'])
  
}
</script>

<style>
.tabber .mint-tabbar .tab{
	width: 25%;
}

.tabber .mint-tab-item.is-selected{
  color: #40E0D0;
  background-color:transparent;
}
</style>