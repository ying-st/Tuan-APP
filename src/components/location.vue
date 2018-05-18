<template>
  <div class="location">
      <!-- 商品详情页 -->
      <mt-header title="城市选择" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>
<!--       <mt-search v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>

      <div class="page-navbar">  
          <mt-navbar class="page-part" v-model="selected">  
            <mt-tab-item id="1">国内</mt-tab-item>  
            <mt-tab-item id="2">海外</mt-tab-item>  
          </mt-navbar>  
        
          <div>  
            <mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell>  
          </div>  
        
          <mt-tab-container v-model="selected">  
            <mt-tab-container-item id="1">  
              <mt-cell v-for="n in 10" :key="n" :title="'内容 ' + n" />  
            </mt-tab-container-item>  
            <mt-tab-container-item id="2">  
              <mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n" />  
            </mt-tab-container-item>    
          </mt-tab-container>  
        </div>   -->
<!--         <div class="miancity">
          <p>热门城市</p>
          <ul>
            <li v-for="(item,index) in maincity" :key="index" @click="pickCity(item.name)">
              {{item.name}}
            </li>
          </ul>
        </div> -->
      <mt-index-list>
        <div class="maincity">
          <p>热门城市</p>
          <ul>
            <li v-for="(item,index) in maincity" :key="index" @click="pickCity(item.name)">
              {{item.name}}
            </li>
          </ul>
        </div>
        <mt-index-section v-for="(item,index) in citylist" :index="item.charactor" :key="index">
          <mt-cell v-for="(i,index) in item.cityList" :key="index" :title="i.name" @click.native="pickCity(i.name)"></mt-cell>
        </mt-index-section>
      </mt-index-list>


  </div>
</template>

<script>
import { IndexList, IndexSection } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex' 
import { api } from '@/global/api'

export default {   
  data () {  
    return {  
      value:"",
      selected: '1',

      maincity: "",
      citylist: ""
    }  
  },  
  mounted:function(){  
      var vm = this;

      //获取json数据
      vm.getData();
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    getData(){
      //获取城市数据
      this.$http.get(api.City).then(function(response){ 
        this.citylist = response.data.city;
        console.log(this.citylist,"jjj")
      },function(response){
        alert('citylist.json请求失败了')
      })

      //获取热门城市数据
      this.$http.get(api.mainCity).then(function(response){ 
        this.maincity = response.data.city;
      },function(response){
        alert('mainCity.json请求失败了')
      })
    },

    pickCity(e){
      console.log(e,'lllll')
      this.$store.dispatch('setCity',e)
      this.$router.push({path: '/'});
    }
  }  
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.location .mint-header{
  height: 45px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
}

.location .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}


.location .mint-search{
  height: 100% !important;
}

.location .mint-indexsection{
  width: 100%;
}

.location .mint-indexlist{
  text-align: left;
  margin-top: 45px;
}

.location .maincity{
  background-color: #fafafa;
  padding-bottom: 2px;
}

.location .maincity p{
  margin: 0;
  padding: 18px 0 18px 12px;
}

.location .maincity li{
  margin: 6px 16px;
  text-align: center;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ece8e8;
}

.location .mint-indexlist-navitem{
  padding: 3px 6px;
}
</style>
