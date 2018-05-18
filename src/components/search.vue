<template>
  <div class="search">
      <mt-header fixed title="fixed top">  
        <mt-button slot="left"  @click="back">
          <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
        </mt-button> 

        <span slot="right" @click="Search(value)">搜索</span> 
      </mt-header>  
        <mt-search v-model="value" placeholder="输入商品名、地名或菜品" @keypress.enter.native="Search(value)"></mt-search>
      
      <div class="history" v-if="showhistory">
      <div class="searchhistory">搜索历史<i class="fa fa-trash fa-lg" slot="right" aria-hidden="true" style="color:gray;" @click="delhistory"></i></div>
      <ul>
        <li v-for="(item,index) in historyData" :key="index" @click="Search(item)"><mt-button type="default">{{item}}</mt-button></li>
      </ul>
      <div class="hot">热门搜索<i class="fa fa-eye fa-lg" slot="right" aria-hidden="true" style="color:gray;" @click="hidehot" v-if="showhot"></i><i class="fa fa-eye-slash fa-lg" slot="right" aria-hidden="true" style="color:gray;" @click="showhots" v-else></i></div>
      <div v-if="showhot">
        <mt-button plain type="primary" class="one" @click="Search('披萨')">披萨</mt-button>
        <mt-button plain type="primary" class="one" @click="Search('寿司')">寿司</mt-button>
      </div>
      <div class="hide" v-else>当前热门搜索已隐藏</div>
      </div>


    <!-- Cascader 级联选择器 -->
    <div class="Cascader" v-if="result">
      <div class="block">
        <el-cascader
          :options="options"
          :show-all-levels="false"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </div>    
      <div class="block">
        <el-cascader
          :options="options1"
          :show-all-levels="false"
          v-model="selectedOptions1"
          @change="handleChange">
        </el-cascader>
      </div>
      <div class="block">
        <el-cascader
          :options="options2"
          :show-all-levels="false"
          v-model="selectedOptions2"
          @change="handleChange">
        </el-cascader>
      </div></div>


      <!-- 搜索结果 -->
      <div class="like" v-if="result">
        <ul>
          <li v-for="(goods,index) in results" :key="index" @click="toList(goods)">
            <el-row :gutter="12">
              <el-col :span="7"><div class="grid-content bg-purple">
                <img :src="goods.l_img">
              </div></el-col>
              <el-col :span="17"><div class="grid-content bg-purple">
                <div class="shopname">{{goods.goodname}}</div>
                <div class="shop_name_sub">{{goods.shop_name_sub}}</div>
                
                <div class="item_price">
                  <div class="price_related"> 
                    <ins class="price_current">¥{{goods.price_current}}</ins>
                    <ins class="price_old">{{goods.price_old}}</ins>                        
                  </div>
                  <div class="sale_desc">已售{{goods.sale_desc}}</div>
                </div>
              </div></el-col>
            </el-row>
          </li>
        </ul>
      </div>


      <div class="noResultWrap" v-if="noGoods">
        <img src="http://imgtu.5011.net/uploads/content/20170419/6769601492584668.png"><p class="noresult">亲，爱团里暂时还没有找到你要的东西呢，输入'披萨'试试吧~  </br>( • ̀ω•́ )</p>
      </div>



  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import { Indicator,MessageBox } from 'mint-ui';
import { api } from '@/global/api'

export default {   
  data () {  
    return {  
      value:"",
      selected: '1',
      result: false,
      noGoods: false,
      showhistory: true,
      showhot: true,

      // 搜索历史
      historyData: [],

      options: [{
        value: '',
        label: '',
        children: [{
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }]
      }],
      selectedOptions: ['remen','all'],

      "options1": [
          {
            value: "all",
            label: "全部分类",
            children: []
          },
          {
            value: "meishi",
            label: "美食",
            children: [
              {
                value: "allmeishi",
                label: "全部美食"
              },
              {
                value: "ribenliaoli",
                label: "日本料理"
              },
              {
                value: "hanguoliaoli",
                label: "韩国料理"
              },
              {
                value: "zizhucan",
                label: "自助餐"
              },
              {
                value: "xican",
                label: "西餐"
              },
              {
                value: "mianbaotiandian",
                label: "面包甜点"
              },
              {
                value: "huoguo",
                label: "火锅"
              },
              {
                value: "xiaochi",
                label: "小吃"
              },
              {
                value: "shaokao",
                label: "烧烤"
              },
              {
                value: "xiawucha",
                label: "下午茶"
              },
              {
                value: "haixian",
                label: "海鲜"
              }
            ]
          },
          {
            value: "xiuxian",
            label: "休闲娱乐",
            children: [
              {
                value: "allxiuxian",
                label: "全部休闲娱乐"
              },
              {
                value: "ktv",
                label: "KTV"
              },
              {
                value: "jiuba",
                label: "酒吧"
              }
            ]
          }
        ],
        selectedOptions1: ['all'],

        "options2": [
            {
              value: "zhineng",
              label: "智能排序",
            },
            {
              value: "zuijin",
              label: "离我最近",
            },
            {
              value: "renqi",
              label: "人气最高",
            },
            {
              value: "pingjia",
              label: "评价最好",
            }
          ],
          selectedOptions2: ['zhineng'],

          // 搜索结果
          results:[{
            id:"",
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

      let Sarg = this.$store.state.mutation.Sarg;
      let types = this.$store.state.mutation.types;
      console.log(types,'weuwiui')
      if(types == '美食'){
        this.showhistory = false;
        this.selectedOptions1=['meishi','allmeishi'];
        vm.getFood(types);
      }else if(types == ''){
        this.selectedOptions1=['all'];
      }else {
        this.showhistory = false;
        this.selectedOptions1=['xiuxian','allxiuxian'];
        vm.getPlay(types);
      }
      if(Sarg !== ''){
        this.value = Sarg;
        this.showhistory = false;
        vm.Search(Sarg);
      }

      // 获取搜索历史
      this.historyData = (this.$store.state.mutation.se_history).reverse()
  },  
  methods: { 
    back:function(){
      this.$store.dispatch('setSarg', '')
      this.$router.go(-1);
    }, 
    getData(){
      this.$http.get(api.third_options).then(function(response){ 
        this.options = response.data.options;
      },function(response){
        alert('获取Cascader 级联选择器的数据失败了')
      })
    },

    Search(value){
      console.log(value,'value')
      this.result = false;
      // this.key = value
      this.value = value
      if(this.value == ''){
        Toast('请输入要搜的宝贝~')
        return
      }
      // 历史搜索
      this.historyData = (this.$store.state.mutation.se_history).reverse()
      let num = this.historyData.indexOf(value)
      if(num !== -1){
        this.$store.dispatch('cutHistory', num)
        this.$store.dispatch('setHistory', value)
      }
      else{
        this.$store.dispatch('setHistory', value);
      }
      // this.$store.dispatch('setHistory', value);
      this.showhistory = false;
      Indicator.open('Loading...');
      //获取搜索数据
      this.$http.get(api.search,{params:{value: value}}).then(function(response){ 
        let items = response.data;
        for( let i in items){
          console.log(i.indexOf(this.value))
          if(i.indexOf(this.value) !== -1){
            this.results = items[i]
            console.log(this.results,'结果')
            break;
          }
          else{
            this.results = '';
          }
        }

        if(this.results.length > 0){
          this.noGoods = false;
          this.result = true
          Indicator.close();
        }else{
          console.log("ss")
          this.noGoods = true;
          Indicator.close();
        }

        
      },function(response){
        alert('搜索数据请求失败了')
      })
    },

    handleChange(value) {
      let item = [];
      // 数据处理
      for(let i = 0; i < value.length; i++){
        item.push(value[i]);
      }
      if(value[1]=="allmeishi"){
        this.getFood(item);
      }else{
        this.getPlay(item);
      }
    },

    // 跳转团购详情页
    toList (goods) {
      this.$store.dispatch('setshowheart', true)
      this.$store.dispatch('setSarg', this.value)
      this.$store.dispatch('setNews', goods)
      console.log(goods,'商品信息')
      this.$router.push({
        path: '/goods'
      })
    },

    // 获取全部美食列表
    getFood(value){
      Indicator.open('Loading...');
      this.$http.get(api.food,{params:{value: value}}).then(function(response){ 
        this.results = response.data.Info;
        this.noGoods = false;
        this.result = true
        Indicator.close();
      },function(response){
        alert('food.json请求失败了')
      })
    },

    // 获取全部休闲娱乐列表
    getPlay(value){
      console.log(value,'opopopo')
      Indicator.open('Loading...');
      this.$http.get(api.play,{params:{value: value}}).then(function(response){ 
        this.results = response.data.Info;
        this.noGoods = false;
        this.result = true
        Indicator.close();
      },function(response){
        alert('play.json请求失败了')
      })
    },

    // 删除历史记录
    delhistory(){
      MessageBox.confirm('确定清空搜索历史吗？','提示').then(action => {
        this.$store.dispatch('cutAlHistory')
      }).catch(() => {
        
      });
    },

    // 隐藏热门搜索
    hidehot(){
      this.showhot = false;
    },

    // 显示热门搜索
    showhots(){
      this.showhot = true;
    }


  }

  
}  
</script>

<style>
/*固定头部*/
.search .mint-header{
  height: 50px;
  background-color: white;
  color: #40E0D0;
}

.search .mint-header .mint-header-button{
  -webkit-box-flex: 0;
  flex: 0;
}

.search .mint-header .mint-button label{
  position: relative;
}

.search .mint-header .mint-button img{
  position: relative;
  top: 5px;
}

/*搜索框*/
.search .mint-search{
  height: 50px;
}

.search .mint-search .mint-searchbar{
  padding: 0 !important;
  width: 78% !important;
  margin: 0 auto;
  position: fixed;
  margin-left: 6%;
}

.search .mint-searchbar{
  left: 12px;
  top: 7px;
  /*背景设为不显示*/
  background-color:transparent !important;
}

.search .mint-searchbar-inner{
  border-radius: 30px;
  background-color: #f0f0f0;
} 

.search .mint-searchbar-core{
  background-color: #f0f0f0;
}

.search .mint-searchbar-inner .mintui-search{
  font-size: 18px;
  margin-right: 6px;
}

/*隐藏取消按钮*/
.search .mint-searchbar-cancel{
  display: none;
}


/*Cascader 级联选择器*/
.search .Cascader{
  position: fixed;
  background-color: #fff;
  z-index: 1;
  border: 1px solid #eff0f3;
  border-top: 4px solid #eff0f3;
  width: 100%;
}

.search .block{
  width:33.3%;
  float: left;
}

.search .el-input__inner{
  border: 0;
  border-right: 1px solid #dcdfe6;
  border-radius: 0; 
}

.search .el-cascader__label{
  text-align: center;
}

.el-cascader-menu__item{
  display: block;
  margin: 0;
}

.el-cascader-menus{
  margin-top: 1px !important; 
  width: 100%;
  left: 0 !important;
}

.el-popper .popper__arrow{
  display: none;
}

.el-cascader-menu{
  float: left;
}

.el-cascader-menu:last-child{
  float: none;
  display: block;
}


/*搜索结果*/
.search .like{
  text-align: left;
  margin-top: 48px;
  background-color: white;
  padding-bottom: 60px;
}

.search .like .like_title{
  height: 30px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 14px;
  color: #777;
}

.search .like ul{
  margin: 0;
}

.search .like ul li{
  margin-left: 15px;
  padding: 11px 0px 11px 0;
  box-sizing: border-box;
  display: -webkit-box;
  height: 125px;
  margin-right: 0;
}

.search .like .el-row{
  width: 100%;
}

.search .like .grid-content {
  border-radius: 4px;
  min-height: 90px;
}

.search .like .bg-purple img{
  height: 90px;
  width: 90px;
}

.search .like .grid-content .shopname{
  font-size: 17px;
  font-weight: 700;
  color: #111;
}

.search .like .grid-content .shop_name_sub{
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

.search .like .grid-content .item_price{
  display: -webkit-box;
  /*justify 额外的空间平均分配给每个子元素  水平等分父容器宽度*/
  -webkit-box-pack: justify;
  height: 22px; 
  line-height: 22px;
  padding-right: 4px;
}

.search .like .item_price .price_current{
  color: #26a2ff;
  font-size: 21px;
  text-decoration: none;
  font-weight: 700;
}

.search .like .item_price .price_old{
  font-size: 13px;
  color: #777;
  text-decoration: line-through;
  vertical-align: 1px;
}

.search .like .item_price .sale_desc{
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

/*无搜索结果提示*/
.search .noResultWrap{
  width: 60%;
  position: absolute;
  top: 30%;
  left: 22%;
  line-height: 35px;
}

.search .noResultWrap img{
  width: 42%;
}

/*搜索历史*/
.search .history ul{
  padding-left: 5%;
  display: flow-root;
}

.search .history li{
  display: inline-block;
  float: left;
  margin: 0 9px 9px 0;
}

.search .history .mint-button{
  border-radius: 16%;
  font-size: 16px;
  float: left;
}

.search .history .searchhistory{
  text-align: left;
  padding: 5% 0 5% 5%;
  font-size: 17px;
}

.search .history i{
  position: absolute;
  right: 6%;
}

/*热门搜索*/
.search .history .hot{
  text-align: left;
  padding: 5% 0 5% 5%;
  font-size: 17px;
}

.search .history .one{
  margin-left: 5%;
}

.search .history .hide{
  font-size: 15px;
  color: #777;
}

</style>
