<template>
  <div class="order">

  <!-- 我的订单 -->
    <div class="title">
      <div>
        <span>我的订单</span>
      </div>
    </div>

    <div class="go_login">
      <mt-button type="primary" @click="goLogin">点击登录</mt-button>
    </div>

  </div>
</template>

<script>
import { api } from '@/global/api'

export default {  
  data () {  
    return {  
    }  
  },  
  mounted:function(){  

  },  
  methods: {  
    goLogin(){
      this.$router.push({path:'/login'})
    }
  }  
}  
</script>

<style>
.order .title{
  width: 100%;
  height: 60px;
  background-color: white;
  margin: 0px 0 2px 0;
  text-align: center;
  position: relative;
}

.order .title div{
  padding: 18px 10px 15px 10px;
}

.order .go_login{
  padding: 50% 0;
}




</style>
