<template>
  <div class="goods">

  <!-- 商品详情页 -->
  <mt-header :title="news.goodname" fixed>
      <mt-button slot="left" @click="back">
          <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
      </mt-button>
      <i class="fa fa-heart-o fa-lg" slot="right" aria-hidden="true" @click="collect" v-if="isshow"></i> 
      <i class="fa fa-heart fa-lg" slot="right" aria-hidden="true" style="color:red;" @click="delcollect" v-else></i> 
  </mt-header>

    <!-- 头部轮播    -->
    <div class="swipe">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(Imgs,index) in goodInfo.img" :key="index">
            <img :src="Imgs.url">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="cost-box">
    <div class="buy-box">
        <div class="price">¥</div>
        <div class="price sum">{{goodInfo.sum}}</div>
        <div class="past Fix">
            <div class="t">
                <span class="o-price">¥{{goodInfo.price_old}}</span>
            </div>
        </div>
        <div class="last">
        <a class="buy-btn" @click="islogin">
          立即购买
        </a>
        </div>
    </div>        
    <ul class="advantage ">
        <li><i class="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>随时可退</li>
        <li><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>过期自动退</li>
    </ul>
    </div>

    <!-- 商家信息 -->
    <div class="shop_info">                                                                
      <div class="shop_name">                                                                           
        <h3>{{goodInfo.shop_name}}</h3>                                                
        <a><i class="fa fa-phone fa-lg" aria-hidden="true" style="color:#26a2ff;"></i></a>                           
      </div>                              
      <div class="address">                                               
          <i class="fa fa-map-marker"></i>{{goodInfo.address}}                      
      </div>                                       
    </div>

    <!-- 团购详情 -->
    <div class="goods_detail">
      <h3 class="tit">团购详情</h3>
      <table width="100%" cellpadding="0" cellspacing="0" class="detail-table">
        <tbody v-for="(Details,index) in goodInfo.detail" :key="index">
          <tr><th colspan="3">{{Details.title}}</th></tr>
          <tr v-for="(DetailInfo,index) in Details.choose" :key="index">
            <td>{{DetailInfo.name}}</td>
            <td class="tc">{{DetailInfo.num}}</td>
            <td class="tc">{{DetailInfo.price}} 元</td>
          </tr>
        </tbody>

        <tr class="total">
          <td></td>
          <td class="tc">最高价值<br><strong>团购价</strong></td>
          <td class="tc">{{goodInfo.max_cost}} 元<br><strong>{{goodInfo.min_cost}}元</strong></td>
        </tr>
      </table>
    </div>

    <Rate></Rate>

  </div>
</template>

<script>
import { api } from '@/global/api'
import {mapGetters,mapActions} from 'vuex' 
import { Toast,MessageBox } from 'mint-ui';
import Rate from './rate'

export default {  
  components: { Rate },
  data () {  
    return {  
      place:"广州",
      value:"",
      select: "1",
      // selected: 'tab3',
      news: "",
      isshow: true,

      goodInfo: []
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取json数据
    vm.getData();

    this.news= this.$store.state.mutation.news
    this.isshow= this.$store.state.mutation.showheart
    console.log(this.news,'ll');

    setTimeout(vm.footprint,500);

  },  
  methods: { 
    back:function(){
      this.$router.go(-1);
    }, 
    //获取数据
    getData(){
      //获取精选数据
      this.$http.get(api.goodInfo).then(function(response){ 
        let goodInfos = response.data;
        for(let i in goodInfos){
          if(this.news.id== 1){
            if(i.indexOf("Info") !== -1){
              this.goodInfo = goodInfos["Info"][0]
            }
          }else if(this.news.id== 2){
            if(i.indexOf("Info1") !== -1){
              this.goodInfo = goodInfos["Info1"][0]
            }
          }else if(this.news.id== 3){
            if(i.indexOf("Info1") !== -1){
              this.goodInfo = goodInfos["Info2"][0]
            }
          }else{
            this.goodInfo=[];
          }
          

        }
        // console.log(this.goodInfo[0].img,"img")
      },function(response){
        alert('goodInfo.json请求失败了')
      })
    },

    islogin (){
      if (this.$store.state.mutation.isLogin){
          MessageBox.confirm('确认购买吗？','提示').then(action => {
          // alert("支付成功！")
          let Obj ={}
          Obj.goodname = this.news.goodname
          Obj.l_img = this.news.l_img
          Obj.buy_goods = this.goodInfo.shop_name
          Obj.price = this.goodInfo.sum
          Obj.receive = true
          Obj.del = false
          Obj.id = this.news.id
          Obj.sort = this.news.sort
          console.log(Obj,"购买商品信息")
          this.$store.dispatch('setBuyinfo',Obj)
          MessageBox.confirm('', {
              message: '购买成功,请及时到店消费~',
              title: '提示',
              confirmButtonText: '查看订单',
              cancelButtonText: '继续浏览'
          }).then(action => {
              if (action == 'confirm') {
                this.$store.dispatch("setTab", 'tab3')
                this.$router.push({path: '/'})
              }
          }).catch(err => {
              if (err == 'cancel') {
                this.$router.push({path:'/goods'})
              }
          });

          // MessageBox.alert('购买成功,请及时到店消费~').then(action =>{
          //     let Obj ={}
          //     Obj.goodname = this.news.goodname
          //     Obj.img = this.news.l_img
          //     Obj.buy_goods = this.goodInfo.shop_name
          //     Obj.price = this.goodInfo.sum
          //     Obj.receive = true
          //     Obj.del = false
          //     Obj.id = this.news.id
          //     Obj.sort = this.news.sort
          //     console.log(Obj,"购买商品信息")
          //     this.$store.dispatch('setBuyinfo',Obj)
          //     this.$router.push('/')
          //   });
        }).catch(() => {
          this.$router.push({path:'/goods'})
        });
      }else {
        MessageBox.confirm('请先登录','提示').then(action => {
          this.$router.push({path:'/login'})
        }).catch(() => {
          this.$router.push({path:'/goods'})
        });
      }
    },

    // 收藏
    collect(){
      if (this.$store.state.mutation.isLogin){
        this.isshow = false;
        let Obj ={}
        Obj.goodname = this.news.goodname
        Obj.l_img = this.news.l_img
        Obj.shop_name = this.goodInfo.shop_name
        Obj.price = this.goodInfo.sum
        Obj.id = this.news.id
        console.log(Obj,"收藏商品信息")
        this.$store.dispatch('setCollect',Obj)
        // let i = this.$store.state.mutation.collect
        // console.log(i,'pppa')
        Toast("收藏成功！")
      } else {
        MessageBox.confirm('请先登录','提示').then(action => {
          this.$router.push({path:'/login'})
        }).catch(() => {

        });
      }
    },

    // 取消收藏
    delcollect(){
      this.isshow = true;
      let item = this.$store.state.mutation.news
      let collectData = this.$store.state.mutation.collect
      let i = collectData.indexOf(item)
      this.$store.dispatch('cutCollect', i)
      Toast("已取消收藏！")
    },

    // 我的足迹数据
    footprint(){
      if (this.$store.state.mutation.isLogin){
        let Obj ={}
        Obj.goodname = this.news.goodname
        Obj.l_img = this.news.l_img
        Obj.shop_name = this.goodInfo.shop_name
        Obj.price = this.goodInfo.sum
        Obj.id = this.news.id
        console.log(Obj,"我的足迹信息")     
           
        let footprintData = this.$store.state.mutation.footprint
        let num = footprintData.indexOf(this.news)
        if(num !== -1){
          this.$store.dispatch('cutFootprint', num)
          this.$store.dispatch('setFootprint', Obj)
        }
        else{
          this.$store.dispatch('setFootprint',Obj)
        }
      

      }
    }

  }  
}  
</script>

<style>
/*头部*/
.goods .mint-header{
  height: 45px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
  z-index: 3;
}

.goods .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.goods .mintui{
  font-size: 20px;
  -webkit-text-stroke-width: 1.2px;
}

/*价格*/
.goods .cost-box {
  padding-left: 15px;
  background-color: #fff; 
}

.goods .cost-box .buy-box {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    margin-top: 0;
    height: 50px;
    background-size: auto 10px;
    line-height: 50px;
}

.goods .buy-box .price {
    font-size: 21px;
    padding-right: 0px;
    color: #26a2ff;
}

.goods .cost-box .buy-box .sum {
    font-size: 28px;
    margin-right: 3px;
}

.goods .cost-box .buy-box .past{
    -webkit-box-flex: 1;
    -webkit-box-align: end;
    display: -webkit-box;
    margin-bottom: 9px;
    line-height: 12px;
}

.goods .cost-box .buy-box .past .t{
    margin-left: 10px;
    font-size: 14px; 
}

.goods .cost-box .buy-box .past .o-price{
    color: #8c8c8c;
    display: inline-block;
    margin-bottom: 5px;
    text-decoration: line-through;
}

.goods .cost-box .buy-box .last{
    padding-top: 8px;
    margin-right: 10px;
}

.goods .cost-box .buy-box .buy-btn{
  height: 34px;
  width: 105px;
  color: #fff;
  background-color: #26a2ff;
  border-radius: 5px;
  text-align: center;
  line-height: 35px;
  display: block;
  font-size: 16px;
  text-decoration: none;
}

.goods .cost-box .advantage{
    height: 45px;
    line-height: 45px;
    color: #666;
}

.goods .cost-box .advantage li{
    float: left;
    width: 50%;
    padding: 0;
    margin: 0;
    text-align: left;
    font-size: 15px;
}

.goods .cost-box .advantage i{
    color: #67c23a;
    margin-right: 5px;
}


/*商家信息*/
.goods .shop_info{
  margin-top: 10px;
  /*background-color: #fff;*/
}

.goods .shop_name{
  padding: 15px 0 15px 15px;
  display: -webkit-box;
  background-color: #fff;
}

.goods .shop_name h3{
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  width: 83%;
  text-align: left;
}

.goods .shop_name a{
  line-height: 27px;
  padding: 0 22px;
}

.goods .address i{
  margin-right: 6px;
}

.goods .address{
    font-size: 14px;
    padding: 14px 0;
    padding-left: 15px;
    text-align: left;
    margin-top: 2px;
    background-color: #fff;
}


/*团购详情*/
.goods .goods_detail{
  padding: 10px 13px;
  text-align: left;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 20px;
}
    
.goods .goods_detail .tit{
  height: 40px;
  line-height: 42px;
  font-size: 16px;
  margin: 0;
}

.goods .goods_detail .detail-table th:last-child {
  text-align: center;
  padding: 10px 5px 10px 0;
}

.goods .goods_detail .detail-table th {
  color: #999;  
}

.goods .goods_detail .detail-table td {
  padding: 10px 0;
  border-bottom: 1px solid #99999940;
}

.goods .goods_detail .detail-table .tc {
  text-align: right;
}


/*最高价格，团购价*/
.goods .goods_detail .detail-table tr.total .tc {
    color: #999;
    text-decoration: line-through;
    line-height: 30px;
}

.goods .goods_detail .detail-table tr.total .tc strong {
    color: #26a2ff;
    display: inline-block;
}

.goods .goods_detail .detail-table tr.total td {
  border: none;
}

/*图片轮播*/
.goods .swipe{
  margin-top: 45px;
  height: 245px;
}

.goods .swipe img{
  width: 100%;
  height: 100%;
}

.goods .mint-swipe-indicator.is-active{
  background: #00ffe9;
}

/*商品详情页*/
/*.goods .detail{
  width: 100%;
  height: 50px;
  background-color: white;
  margin: 0px 0 2px 0;
  text-align: center;
  position: relative;
}

.goods .detail div{
  padding: 18px 10px 15px 10px;
}*/





</style>
