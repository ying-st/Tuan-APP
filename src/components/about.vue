<template>
  <div class="about">
      <!-- 版本信息 -->
      <mt-header title="版本信息" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>

      <div class="version">
        <img class="img" src="../assets/version.jpg">
        <div class="word">每一次爱团，都是对生活的一次微笑</div>
        <div class="word">享受生活，精彩每一天~</div>
        <div class="bottom">
        <div>当前版本&nbsp;1.0.0</div>
        <div class="love">关于爱团</div></div>
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
    }
  }


}  
</script>

<style>
.about .mint-header{
  height: 45px;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
}

.about .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.about .version{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.about .version .img{
  margin: auto;
  width: 60%;
  height: 34%;
  margin-top: 32%;
  border-radius: 50%;
  margin-bottom: 16%;
}

.about .word{
  padding: 12px;
  font-size: 17px;
}

.about .version .bottom{
  position: absolute;
  bottom: 0;
  left: 34%;
}

.about .version .bottom div{
  padding: 3px;
}

.about .version .bottom .love{
  font-size: 13px;
  color: #909399;
}

</style>
