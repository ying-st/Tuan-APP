<template>
  <div class="mycollect">
      <!-- 我的收藏 -->
      <mt-header title="我的收藏" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>

      <div class="collect">
        <div class="nocollect" v-if="isshow">
        <!-- <div class="nocollect" v-if="false"> -->
          <img class="img" src="../assets/nocollect.jpg">
          <div class="word">暂时还没有任何收藏哟~</div>
        </div>
        
        <div class="list">
          <ul>
            <li v-for="(item,index) in collectData" :key="index">
              <el-row :gutter="12">
                <el-col :span="7"><div class="grid-content bg-purple">
                  <img :src="item.l_img">
                </div></el-col>
                <el-col :span="17"><div class="grid-content bg-purple">
                  <div class="goodname">{{item.goodname}}</div>
                  <div class="shop_name">{{item.shop_name}}<span class="price_current">¥{{item.price}}</span></div>
                  <div class="btn">
                  <button class="mint-button mint-button--primary mint-button--small is-plain" @click="toGoods(item)"><label class="mint-button-text">查看详情</label></button>
                  <button class="mint-button mint-button--primary mint-button--small is-plain" @click="delcollect(item)"><label class="mint-button-text">取消收藏</label></button>
                  </div>
                </div></el-col>
              </el-row>
            </li>
          </ul>
        </div>

      </div>

  </div>
</template>

<script>
import { MessageBox,Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex' 
import { api } from '@/global/api'

export default {   
  data () {  
    return {  
      collectData: [],
      isshow: true
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取收藏数据
    vm.getData();
  },  
  methods: {  
    back:function(){
      this.collectData.reverse()
      this.$router.go(-1);
    },

    getData(){
      // 深拷贝
      // let item = JSON.parse(JSON.stringify(this.$store.state.mutation.collect))
      this.collectData = (this.$store.state.mutation.collect).reverse();
      console.log(this.collectData, 'shoucang')
      if(this.collectData.length == 0){
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },

    // 查看详情
    toGoods(item){
      this.$store.dispatch('setNews', item)
      this.collectData.reverse()
      this.$store.dispatch('setshowheart', false)
      this.$router.push({
        path: '/goods'
      })
    },

    // 取消收藏
    delcollect(item){
      MessageBox.confirm('确定取消收藏吗').then(
        (action) => {
          let i = this.collectData.indexOf(item)
          this.$store.dispatch('cutCollect', i)
          this.getData();
          Toast("已取消收藏！")
        }
      ).catch(() => {
        
      });
    }


  }  
}  
</script>

<style>
.mycollect .mint-header{
  height: 45px;
  background-color: #a4f9f0;
  color: #333;
  font-size: 16px;
}

.mycollect .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.mycollect .collect {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.mycollect .nocollect{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.mycollect .nocollect .img{
  margin: auto;
  width: 48%;
  height: 27%;
  margin-top: 40%;
  margin-bottom: 16%;
}

.mycollect .word{
  padding: 12px;
  font-size: 17px;
}

/*收藏列表*/
.mycollect .collect .list{
  margin-top: 45px;
  text-align: left;
}

.mycollect .list ul{
  margin: 0;
  padding-top: 18px;
}

.mycollect .list ul li{
  /*margin-left: 15px;*/
  margin: 0;
  padding: 11px 0 11px 15px;
  box-sizing: border-box;
  display: -webkit-box;
  /*height: 125px;*/
  margin-right: 0;
  border-bottom: 1px solid #ebeef5;
  background-color: #fff;
}

.mycollect .list .el-row{
  width: 100%;
}

.mycollect .list .grid-content {
  border-radius: 4px;
  /*min-height: 90px;*/
}

.mycollect .list .bg-purple img{
  height: 90px;
  width: 90px;
}

.mycollect .list .grid-content .goodname{
  font-size: 17px;
  font-weight: 700;
  color: #111;
}

.mycollect .list .grid-content .shop_name{
  overflow: hidden;
  font-size: 13px;
  color: #777;
  padding-top: 9px;
  margin-bottom: 13px;
  overflow: hidden;
}

.mycollect .list .price_current{
  color: #26a2ff;
  font-size: 16px;
  text-decoration: none;
  font-weight: 700;
  float: right;
}

.mycollect .list .btn{
  text-align: right;
}

</style>
