<template>
  <div class="footprint">
      <!-- 最近浏览 -->
      <mt-header title="我的足迹" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
          <i class="fa fa-trash fa-lg" slot="right" aria-hidden="true" style="color:gray;" @click="delAlRecord"></i>
      </mt-header>

      <div class="records">
        <div class="noRecord" v-if="isshow">
          <img class="img" src="../assets/nofootprint.jpg">
          <div class="word">暂时还没有任何浏览记录哟~</div>
        </div>
        
        <div class="list">
          <ul>
            <li v-for="(item,index) in footprintData" :key="index">
              <el-row :gutter="12">
                <el-col :span="7"><div class="grid-content bg-purple">
                  <img :src="item.l_img">
                </div></el-col>
                <el-col :span="17"><div class="grid-content bg-purple">
                  <div class="goodname">{{item.goodname}}</div>
                  <div class="shop_name">{{item.shop_name}}<span class="price_current">¥{{item.price}}</span></div>
                  <div class="btn">
                  <button class="mint-button mint-button--primary mint-button--small is-plain" @click="toGoods(item)"><label class="mint-button-text">查看详情</label></button>
                  <button class="mint-button mint-button--primary mint-button--small is-plain" @click="delcollect(item)"><label class="mint-button-text">删除足迹</label></button>
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
      footprintData: [],
      isshow: true
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取我的足迹数据
    vm.getData();
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
      this.footprintData.reverse();
    },

    getData(){
      // 深拷贝
      // let item = JSON.parse(JSON.stringify(this.$store.state.mutation.footprint))
      // this.footprintData = item.reverse();
      this.footprintData = (this.$store.state.mutation.footprint).reverse();
      if(this.footprintData.length == 0){
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },

    // 查看详情
    toGoods(item){
      this.$store.dispatch('setNews', item)
      this.footprintData.reverse();
      this.$router.push({
        path: '/goods'
      })
    },

    // 删除足迹
    delcollect(item){
      MessageBox.confirm('确定删除足迹吗').then(
        (action) => {
          let i = this.footprintData.indexOf(item)
          console.log(i,'opop')
          this.$store.dispatch('cutFootprint', i)
          this.getData();
          Toast("已删除足迹！")
        }
      ).catch(() => {
        
      });
    },

    // 删除全部足迹
    delAlRecord(){
      MessageBox.confirm('确定清空我的足迹吗？','提示').then(action => {
        this.$store.dispatch('cutAlFootprint')
        this.isshow = true;
      }).catch(() => {
        
      });
    }


  }  
}  
</script>

<style>
.footprint .mint-header{
  height: 45px;
  background-color: #a4f9f0;
  color: #333;
  font-size: 16px;
}

.footprint .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.footprint .records {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.footprint .noRecord{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.footprint .noRecord .img{
  margin: auto;
  width: 48%;
  height: 27%;
  margin-top: 40%;
  margin-bottom: 8%;
}

.footprint .word{
  padding: 12px;
  font-size: 17px;
}

/*收藏列表*/
.footprint .records .list{
  margin-top: 45px;
  text-align: left;
}

.footprint .list ul{
  margin: 0;
  padding-top: 18px;
}

.footprint .list ul li{
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

.footprint .list .el-row{
  width: 100%;
}

.footprint .list .grid-content {
  border-radius: 4px;
  /*min-height: 90px;*/
}

.footprint .list .bg-purple img{
  height: 90px;
  width: 90px;
}

.footprint .list .grid-content .goodname{
  font-size: 17px;
  font-weight: 700;
  color: #111;
}

.footprint .list .grid-content .shop_name{
  overflow: hidden;
  font-size: 13px;
  color: #777;
  padding-top: 9px;
  margin-bottom: 13px;
  overflow: hidden;
}

.footprint .list .price_current{
  color: #26a2ff;
  font-size: 16px;
  text-decoration: none;
  font-weight: 700;
  float: right;
}

.footprint .list .btn{
  text-align: right;
}

</style>
