<template>
  <div class="order">

  <!-- 我的订单 -->
    <div class="go_where">
      <div>
        <span>我的订单</span>
      </div>
    </div>


  <!-- Navbar 切换页 -->
      <div class="page-navbar">  
          <!-- navbar -->  
          <mt-navbar class="page-part" v-model="select">  
            <mt-tab-item id="1">全部订单</mt-tab-item>  
            <mt-tab-item id="2">待评价</mt-tab-item>
            <mt-tab-item id="3">已评价</mt-tab-item>
          </mt-navbar>   
        
          <!-- tabcontainer -->
          <!-- 全部订单   -->
          <mt-tab-container v-model="select">  
            <mt-tab-container-item class="tab1" id="1">  
              <ul v-for="(order,index) in orderData" :key="index">
                <li class="two">
                  <div class="goodName">
                    {{ order.goodname }} &nbsp;
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                  </div>
                  <el-row class="orderDetail">
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="img-panel"><img :src="order.l_img"></div>
                    </div></el-col>
                    <el-col :span="16"><div class="grid-content bg-purple">
                      <div class="info-panel">
                        <div class="item-title">{{ order.buy_goods }}</div>
                        <span class="item-other">总价：￥{{ order.price }}</span>
                      </div>
                    </div></el-col>
                  </el-row>
                  <el-row class="pay">
                    <button class="mint-button mint-button--default mint-button--small is-plain" @click="toGoods(order)"><label class="mint-button-text">查看详情</label></button>
                    <button class="mint-button mint-button--primary mint-button--small is-plain" v-if="order.receive" @click="receive(order)"><label class="mint-button-text">确认消费</label></button>
                    <button class="mint-button mint-button--primary mint-button--small is-plain" v-if="order.del" @click="delorder(order)"><label class="mint-button-text">删除订单</label></button>
<!--                     <button class="mint-button mint-button--primary mint-button--small is-plain" v-if="order.del" @click="goRate(order)"><label class="mint-button-text">评价</label></button> -->
<!--                     <button class="mint-button mint-button--default mint-button--small is-plain"><label class="mint-button-text">已评价</label></button> -->
                  </el-row>
                </li>
              </ul> 
              <div class="tip" v-if="showorder">这里还没有订单哦，</br>快去购买团购券吧(￣▽￣)~*</div>
            </mt-tab-container-item>  
            <!-- 待评价 -->
            <mt-tab-container-item class="tab2" id="2">  
               <ul v-for="(item,index) in consumData" :key="index">
                 <li class="two">
                   <div class="goodName">
                     {{ item.goodname }} &nbsp;
                     <i class="fa fa-caret-right" aria-hidden="true"></i>
                   </div>
                   <el-row class="orderDetail">
                     <el-col :span="8"><div class="grid-content bg-purple">
                       <div class="img-panel"><img :src="item.l_img"></div>
                     </div></el-col>
                     <el-col :span="16"><div class="grid-content bg-purple">
                       <div class="info-panel">
                         <div class="item-title">{{ item.buy_goods }}</div>
                         <span class="item-other">总价：￥{{ item.price }}</span>
                       </div>
                     </div></el-col>
                   </el-row>
                   <el-row class="pay">
                     <button class="mint-button mint-button--default mint-button--small is-plain" @click="toGoods(item)"><label class="mint-button-text">查看详情</label></button>
                     <button class="mint-button mint-button--primary mint-button--small is-plain" @click="goRate(item)"><label class="mint-button-text">评价</label></button>
                   </el-row>
                 </li>
               </ul> 
               <div class="tip" v-if="showconsum">这里还没有订单哦，</br>快去确认消费吧（づ￣3￣）づ╭*～</div>
            </mt-tab-container-item>
            <!-- 已评价     -->
             <mt-tab-container-item class="tab3" id="3">  
                <ul v-for="(item,index) in AlconsumData" :key="index">
                  <li class="two">
                    <div class="goodName">
                      {{ item.goodname }} &nbsp;
                      <i class="fa fa-caret-right" aria-hidden="true"></i>
                    </div>
                    <el-row class="orderDetail">
                      <el-col :span="8"><div class="grid-content bg-purple">
                        <div class="img-panel"><img :src="item.l_img"></div>
                      </div></el-col>
                      <el-col :span="16"><div class="grid-content bg-purple">
                        <div class="info-panel">
                          <div class="item-title">{{ item.buy_goods }}</div>
                          <span class="item-other">总价：￥{{ item.price }}</span>
                        </div>
                      </div></el-col>
                    </el-row>
                    <el-row class="pay">
                      <button class="mint-button mint-button--primary mint-button--small is-plain" @click="delorder2(item)"><label class="mint-button-text">删除订单</label></button>
                      <button class="mint-button mint-button--default mint-button--small is-plain"><label class="mint-button-text">已评价</label></button>
                    </el-row>
                  </li>
                </ul> 
                <div class="tip" v-if="showAlconsum">这里还没有订单哦，</br>快去发表评价吧ヽ(ー_ー)ノ</div>
             </mt-tab-container-item> 
          </mt-tab-container>  
      </div>

  </div>
</template>

<script>
import { api } from '@/global/api'
import { MessageBox } from 'mint-ui'

export default {  
  data () {  
    return {  
      place:"广州",
      value:"",
      select: "1",
      // selected: 'tab3',

      orderData: "",   // 全部订单信息
      consumData: "",    // 待消费订单信息
      AlconsumData: "",   // 已消费订单信息

      // 提示
      showorder: false,
      showconsum: false,
      showAlconsum: false
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取订单数据
    vm.getData();

  },  
  methods: { 
    // 获取订单数据
    getData(){
      this.orderData = (this.$store.state.mutation.buyinfo).reverse();
      this.consumData = (this.$store.state.mutation.beconsum).reverse();
      this.AlconsumData = (this.$store.state.mutation.Alconsum).reverse();
      if(this.orderData.length == 0){
        this.showorder = true;
      } else{
        this.showorder = false;
      }
      if(this.consumData.length == 0){
        this.showconsum = true;
      } else{
        this.showconsum = false;
      }
      if(this.AlconsumData.length == 0){
        this.showAlconsum = true;
      } else{
        this.showAlconsum = false;
      }
      console.log(this.orderData,'订单信息')
      console.log(this.AlconsumData,'已评价订单')
    },


    // 确认消费
    receive (order) {
      let i = this.orderData.indexOf(order)
      order.receive = false
      order.del = true
      this.showconsum = false;
      MessageBox({
        title: '提示',
        message: '消费成功！',
        showCancelButton: false
      });

      this.$store.dispatch('setBeconsum',order)
      this.consumData = this.$store.state.mutation.beconsum;
      console.log(this.consumData,'uuu')
      // this.consumData.push(order) ;
      // console.log(this.consumData,'uuu')
    },

    // 删除订单
    delorder (order) {
      MessageBox.confirm('确定删除订单吗').then(
        (action) => {
          let i = this.orderData.indexOf(order)
          let j = this.consumData.indexOf(order)
          let k = this.AlconsumData.indexOf(order)
          this.$store.dispatch('cutBuyinfo', i)
          this.$store.dispatch('cutBeconsum', j)
          this.$store.dispatch('cutAlconsum', k)
          if(this.orderData.length == 0){
            this.showorder = true;
          } else{
            this.showorder = false;
          }
          if(this.consumData.length == 0){
            this.showconsum = true;
          } else{
            this.showconsum = false;
          }
          if(this.AlconsumData.length == 0){
            this.showAlconsum = true;
          } else{
            this.showAlconsum = false;
          }
        }
      ).catch(() => {
       
      });
    },

    // 删除已评价订单
    delorder2 (order) {
      MessageBox.confirm('确定删除订单吗').then(
        (action) => {
          let i = this.AlconsumData.indexOf(order)
          this.$store.dispatch('cutAlconsum', i)
          if(this.AlconsumData.length == 0){
            this.showAlconsum = true;
          } else{
            this.showAlconsum = false;
          }
        }
      ).catch(() => {

      });
    },

    // 查看详情
    toGoods(item){
      console.log(item,'lll')
      this.$store.dispatch('setNews', item)
      this.$router.push({
        path: '/goods'
      })
    },

    // 评价
    goRate(order){
      this.$router.push('/evaluate')
      console.log(order,'jjjj')
      this.$store.dispatch('setNews', order)
    }

  }  
}  
</script>

<style>
/*我的订单*/
.order .go_where{
  width: 100%;
  height: 60px;
  background-color: white;
  margin: 0px 0 2px 0;
  text-align: center;
  position: relative;
}

.order .go_where div{
  padding: 18px 10px 15px 10px;
}



/*Navbar 切换页*/
.order .page-navbar{
  margin-bottom: 60px;
}

.order .mint-navbar .mint-tab-item.is-selected{
  margin-bottom: 0;
  color: #40E0D0;
  border-bottom: 3px solid #40E0D0;
}

.order .mint-tab-item-label{
  font-size: 14px;
}

.order ul{
  margin: 0; 
}

.order .one{  
  margin: 0;
  width: 100%;
  height: 245px;
  background-color: white;
}

.order .grid-content {
  min-height: 20px;
}

.order .orderDetail{
  margin: 15px;
  text-align: left;
  font-size: 15px; 
  background-color: #fafafa;
}

.order .goodName{
  text-align: left;
  padding: 12px 12px 0 12px;
  font-size: 17px;
  font-weight: bold;
}

.order .pay{
  text-align: right;
  padding: 0 35px 12px 0; 
}

.order .img_panel{
  height: 136px;
  width: 100%;
}

.order .img_panel img{
  width: 100%;
  height: 100%;
}

.order .item-info{
  position: relative;
  padding-top: 7px;
} 

.order .item-title{
  padding-top: 9px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /*color: #111;*/
}

.order .item-info .item-tag{
  padding: 0 3px;
  border: 1px solid #d2a156;
  color: #d2a156;
  border-radius: 2px;
  height: 17px;
  line-height: 17px;
  box-sizing: border-box;
}

.order .item-info .item-other{
  position: absolute;
  right: 0;
  bottom: 0;
}

.order .two{  
  margin: 0;
  margin-top: 3px;
  width: 100%;
  /*height: 142px;*/
  background-color: white;
}

.order .two .info-panel{
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-right: 10px;
  overflow: hidden;
  /*min-height: 112px;*/
}

.order .two .info-panel .item-info{
  margin-top: 15px;
}

.order .two .item-title{
  margin-bottom: 12px;
/*  padding-top: 0;*/
}

.order .two .img-panel{
  position: relative;
  width: 80px;
  height: 80px;
}

.order .two .img-panel img{
  width: 100%;
  height: 100%;
}

.order .gap{
  margin-bottom: 12px;
}

/*提示*/
.order .tip{
  padding-top: 55%;
  line-height: 32px;
}


</style>
