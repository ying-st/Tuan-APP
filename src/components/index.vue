<template>  
  <div class="index">
  <!-- 头部   -->
        <mt-header fixed title="fixed top">  
          <router-link to="./location" slot="left">  
            <mt-button>
            	{{place}}
            	<img src="../assets/down_slide.png" width="20"> 
            </mt-button> 
          </router-link>  
          <i class="fa fa-plus-circle fa-2x" slot="right" aria-hidden="true"></i>  
        </mt-header>  
        <mt-search v-model="value" placeholder="输入商品名、地名或菜品" @click.native="go"></mt-search>


  <!-- 头部轮播    -->
      <div class="swipe">
        <mt-swipe :auto="0">
          <mt-swipe-item>
          <!-- 读取本地图片 -->
            <ul>
              <li v-for="item in itemlist" :key="item.icon" @click="toList(item)">
                <img slot="icon" :src="require(`../assets/${item.icon}`)"><div>{{item.name}}</div>
              </li>
            </ul>
          </mt-swipe-item>
          <mt-swipe-item>
          <!-- 读取在线图片 -->
            <ul>
              <li  v-for="item2 in itemlist2" :key="item2.icon">
                <img slot="icon" :src="item2.icon"><div>{{item2.name}}</div>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
      </div>


  <!-- 头部图案 -->
      <div class="top_banner">
        <img slot="icon" :src="img_url">
      </div>

  <!-- 精选热门电影 -->
      <div class="m_content">
      <!-- element的Layout 布局 -->
        <el-row :gutter="3">
          <el-col :span="12" v-for="middle in middle_list" :key="middle.title"><div class="grid-content bg-purple">
            <div class="title">{{middle.title}}</div>
            <div>{{middle.tip}}</div>
            <img :src="middle.m_img">
          </div></el-col>
        </el-row>
      </div>

  <!-- 猜你喜欢，图片懒加载 -->
      <div class="like">
        <div class="like_title">猜你喜欢</div>
        <ul>
          <li v-for="(likes,index) in likelist" :key="index" @click="toGood(likes)">
            <el-row :gutter="12">
              <el-col :span="7"><div class="grid-content bg-purple">
                <img :src="likes.l_img">
              </div></el-col>
              <el-col :span="17"><div class="grid-content bg-purple">
                <div class="shopname">{{likes.goodname}}</div>
                <div class="shop_name_sub">{{likes.shop_name_sub}}</div>
                
                <div class="item_price">
                  <div class="price_related"> 
                    <ins class="price_current">¥{{likes.price_current}}</ins>
                    <ins class="price_old">{{likes.price_old}}</ins>                        
                  </div>
                  <div class="sale_desc">已售{{likes.sale_desc}}</div>
                </div>
              </div></el-col>
            </el-row>
          </li>
        </ul>
      </div>

  </div>  
</template>  
  
<script> 
import img1 from '../assets/top-banner.png'
import {mapGetters,mapActions} from 'vuex'
import { api } from '@/global/api'

export default {  
  // components: { Tabber }, 
  data () {  
    return {  
        place:"",
        value:"",
        // selected:"tab1",

        // 头部轮播
        itemlist:[],

        itemlist2:[{
          icon:"",
          name:""
        }],

        // 头部图案
        img_url: img1,

        // 精选热门电影
        middle_list:[{
          title:"",
          tip:"",
          m_img:""
        }],

        // 猜你喜欢
        likelist:[{
          l_img: "",
          shopname: "",
          shop_name_sub: "",
          price_current: "",
          price_old: "",
          sale_desc: ""
        }]

    }  
  },  
  mounted:function(){  
      var vm = this;

      //获取json数据
      vm.getData();

      // this.place = this.$store.state.mutation.city
  },  
  watch: {
    // selected: function (val, oldVal) {
    //     // 这里就可以通过 val 的值变更来确定,切换底部导航
    //     // console.log(val)
    //     if(val == "tab1"){
    //       this.$router.push('./index');
    //     }
    //     if(val == "tab2"){
    //       this.$router.push('./quality');
    //     }
    //     if(val == "tab3"){
    //       this.$router.push('./discover');
    //     }
    //     if(val == "tab4"){
    //       this.$router.push('./mine');
    //     }
    // }
  },
  methods: {  
    //获取数据
    getData(){
      //获取头部轮播数据
      this.$http.get(api.itemlist).then(function(response){ 
        this.itemlist = response.data.itemData;
      },function(response){
        alert('itemlist.json请求失败了')
      })

      this.$http.get(api.itemlist2).then(function(response){ 
        this.itemlist2 = response.data.itemData2;
      },function(response){
        alert('itemlist2.json请求失败了')
      })

      //获取精选热门电影数据
      this.$http.get(api.i_middlelist).then(function(response){ 
        this.middle_list = response.data.middleData;
      },function(response){
        alert('middle-list.json请求失败了')
      })

      this.place = this.$store.state.mutation.city

      if(this.place == '江门'){
        this.$http.get(api.jm_likelist,{params:{value: this.place}}).then(function(response){ 
          this.likelist = response.data.likeData;
        },function(response){
          alert('jm_likelist.json请求失败了')
        })
      } else{
          this.$http.get(api.i_likelist,{params:{value: this.place}}).then(function(response){ 
            this.likelist = response.data.likeData;
        },function(response){
          alert('middle-list.json请求失败了')
        })
      }

    },

    //商品列表
    toList (item) {
      // this.$router.push({
      //   path: '/goods'
      // })
      console.log(item.name,'种类')
      this.$store.dispatch('setType', item.name)
      this.$router.push({
        path: '/search'
      })
    },

    //搜索页
    go(){
      this.$store.dispatch('setType', '')
      this.$store.dispatch('setSarg', '')
      this.$router.push({
        path: '/search'
      })
    },

    //猜你喜欢跳转商品详情页面
    toGood (goods) {
      this.$store.dispatch('setshowheart', true)
      this.$store.dispatch('setNews', goods)
      this.$router.push({
        path: '/goods'
      })
    }
  }  
}  
</script>

<style>
/*固定头部*/
.index .mint-header{
	height: 50px;
	background-color: #40E0D0;
}

.index .mint-header .mint-header-button{
  -webkit-box-flex: 0;
  flex: 0;
}

.index .mint-header .mint-button label{
	position: relative;
}

.index .mint-header .mint-button img{
	position: relative;
  top: 5px;
}

/*搜索框*/
.index .mint-search{
  height: 50px;
}

.index .mint-search .mint-searchbar{
  padding: 0 !important;
  width: 66% !important;
  margin: 0 auto;
  position: fixed;
  margin-left: 17%;
}

.index .mint-searchbar{
  left: 12px;
  top: 7px;
  /*背景设为不显示*/
  background-color:transparent !important;
}

.index .mint-searchbar-inner{
  border-radius: 30px;
} 

.index .mint-searchbar-inner .mintui-search{
  font-size: 18px;
  color: #40E0D0;
  margin-right: 6px;
}

/*隐藏取消按钮*/
.index .mint-searchbar-cancel{
  display: none;
}


/*头部轮播*/
.index .swipe{
  background-color: white;
}

.index .swipe .mint-swipe{
  height: 200px;
}

.index .mint-swipe-indicator.is-active {
  background-color: #40E0D0;
  opacity: 1;
}

/*element的Layout 布局*/
/*.index .swipe .grid-content {
  min-height: 74px;
  padding: 13px 0 0;
  font-size: 13px;
}

.index .swipe .grid-content img{
  width: 44px;
  height: 44px;
  margin-bottom: 3px;
}*/

.index .swipe ul{
  margin: 0;
  min-height: 74px;
  padding: 13px 0 0;
  font-size: 13px;
}

.index .swipe ul li{
  width: 20%;
  height: 100%;
  margin: 0;
  float: left;
  padding-bottom: 15px;
}

.index .swipe ul li img{
  width: 44px;
  height: 44px;
  margin-bottom: 3px;
}

/*头部图片*/
.index .top_banner{
  background-color: white;
}

.index .top_banner img{
  width: 100%;
  border-radius: 50px;
}

/*精选热门电影*/
.index .m_content {
  margin-top: 10px;
  text-align: left;
}

.index .m_content .bg-purple{
  background: white;
  padding-left: 15px;
  font-size: 12px;
  color: #999;
  position: relative;
}

.index .m_content .grid-content {
  min-height: 75px;
  /*padding: 13px 0 0;*/
}

.index .m_content .bg-purple .title{
  font-size: 16px;
  padding-top: 15px;
  color: #3da8db;
}

.index .m_content .bg-purple img{
  height: 53px;
  position: absolute;
  top: 12px;
  right: 5px;
}

/*猜你喜欢，图片懒加载*/
.index .like{
  text-align: left;
  margin-top: 10px;
  background-color: white;
  padding-bottom: 60px;
}

.index .like .like_title{
  height: 30px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 14px;
  color: #777;
}

.index .like ul{
  margin: 0;
}

.index .like ul li{
  margin-left: 15px;
  padding: 11px 0px 11px 0;
  box-sizing: border-box;
  display: -webkit-box;
  height: 125px;
  margin-right: 0;
}

.index .like .el-row{
  width: 100%;
}

.index .like .grid-content {
  border-radius: 4px;
  min-height: 90px;
}

.index .like .bg-purple img{
  height: 90px;
  width: 90px;
}

.index .like .grid-content .shopname{
  font-size: 17px;
  font-weight: 700;
  color: #111;
}

.index .like .grid-content .shop_name_sub{
  overflow: hidden;
  font-size: 13px;
  color: #777;
  padding-top: 9px;
  margin-bottom: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.index .like .grid-content .item_price{
  display: -webkit-box;
  /*justify 额外的空间平均分配给每个子元素  水平等分父容器宽度*/
  -webkit-box-pack: justify;
  height: 22px; 
  line-height: 22px;
  padding-right: 4px;
}

.index .like .item_price .price_current{
  color: #26a2ff;
  font-size: 21px;
  text-decoration: none;
  font-weight: 700;
}

.index .like .item_price .price_old{
  font-size: 13px;
  color: #777;
  text-decoration: line-through;
  vertical-align: 1px;
}

.index .like .item_price .sale_desc{
  overflow: hidden;
  /*ellipsis  显示省略符号来代表被修剪的文本。*/
  text-overflow: ellipsis; 
  /*nowrap  文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
  white-space: nowrap;
  text-align: right;
  font-size: 13px;
  color: #777;
  line-height: 24px;
}

/*底部导航*/
/*.index .mint-tabbar > .mint-tab-item.is-selected{
  color: #f63;
  background-color:transparent;
}*/
</style>
