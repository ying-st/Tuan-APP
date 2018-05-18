<template>
  <div class="echart">
      <mt-header title="数据分析" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>

      <div class="list">
        <router-link to="./pie">
          <mt-cell title="团购消费种类占比图" is-link></mt-cell>
        </router-link>
        <router-link to="./bar">
          <mt-cell title="团购交易额总览图" is-link></mt-cell>
        </router-link>
        <router-link to="./map">
          <mt-cell title="爱团APP用户全国分布图" is-link></mt-cell>
        </router-link>
        <mt-cell title="标题文字" is-link></mt-cell>
        <mt-cell title="标题文字" is-link></mt-cell>
      </div>

  </div>
</template>

<script>
import { IndexList, IndexSection } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex' 
import { api } from '@/global/api'

export default {   
  data () {  
    return {  

    }  
  },  
  mounted:function(){  

  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },


    
  }  
}  
</script>

<style>
.echart .mint-header{
  height: 45px;
  background-color: #66b1ff;
  color: #333;
  font-size: 16px;
}

.echart .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.echart a{
  color: black;
}

.echart .list{
  margin-top: 48px;
}

.echart .list .mint-cell-title{
  text-align: left;
  font-size: 17px;
}

.echart .list .mint-cell{
  min-height: 83px;
}

</style>
