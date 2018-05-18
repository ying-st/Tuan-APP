<template>
  <div class="rate">
<!--     <mt-header title="点评列表" fixed>
        <mt-button slot="left"  @click="back">
            <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
        </mt-button> 
    </mt-header> -->

    <div class="title">网友点评</div>

    <div class="list">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in rateList" :key="item.name" :label="item.name" :name="item.name">
       <ul>
          <li class="one" v-for="(part,index) in item.Info" :key="index">
            <img :src="part.head" class="user_avatar">
            <div class="content">
              <div>{{part.username}}<span class="time">{{part.time}}</span></div>
              <div class="score">
                评分
                <div class="rate">
                  <el-rate
                    v-model="part.score" disabled
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                  </el-rate>
                </div>
              </div>
              <div class="assess">
                {{part.content}}
              </div>
              <ul class="imgList" v-if="part.Imgs">
                <li v-for="(imgs,index) in part.Imgs" :key="index"><img :src="imgs.url"></li>
              </ul>
            </div>
          </li>
          <li class="one" v-for="rate in rateData" :key="rate.key">
            <img :src="rate.head" class="user_avatar">
            <div class="content">
              <div>{{rate.username}}<span class="time">{{rate.time}}</span></div>
              <div class="score">
                评分
                <div class="rate">
                  <el-rate
                    v-model="rate.score" disabled
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                  </el-rate>
                </div>
              </div>
              <div class="assess">
                {{rate.judge}}
              </div>
              <ul class="imgList" v-if="rate.imgs">
                <li v-for="(img,index) in rate.imgs" :key="img"><img :src="img"></li>
              </ul>
            </div>
          </li>
       </ul>
      </el-tab-pane>
    </el-tabs>
    </div>

  </div>
</template>

<script>
import { api } from '@/global/api'

export default {   
  data () {  
    return {  
      activeName2: '全部',
      rateList: '',

      value2: 2,

      rateData: ''
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取json数据
    vm.getData();

    let goodnew = this.$store.state.mutation.news
    //获取披萨用户评价数据
    if(goodnew.id == 1 || goodnew.id == 2){
      this.rateData = this.$store.state.mutation.rateinfo;
    }else{
      this.rateData = this.$store.state.mutation.rateinfo2;
    }
    console.log(this.rateData,'啦啦啦啦')
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },

    //获取数据
    getData(){
      let news = this.$store.state.mutation.news
      console.log(news,'评价商品匹配信息');
      if(news.id == 1 || news.id == 2){
        //获取披萨用户评价数据
        console.log('pisa')
        this.$http.get(api.evaluate).then(function(response){ 
          this.rateList = response.data.rates;
        },function(response){
          alert('evaluate.json请求失败了')
        })
      } else {
        //获取寿司用户评价数据
        console.log('shousi')
        this.$http.get(api.evaluate).then(function(response){ 
          this.rateList = response.data.rates1;
        },function(response){
          alert('evaluate.json请求失败了')
        })
      }

    }

  }  
}  
</script>

<style>
/*.rate .mint-header{
  height: 45px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
}

.rate .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}*/

.rate .title{
  background-color: #fff;
  /*text-align: left;*/
  color: #409eff;
  padding: 10px;
}

/*Tab 选择*/
.rate .el-tabs--card>.el-tabs__header{
  border: none;
  background-color: #fff;
  padding: 12px 2px;
}

.rate .el-tabs__item{
  float: left;
  padding: 0 10px !important;
  margin: 0 5px;
  border: 1px solid #c0c4cc;
  border-radius: 13px;
  margin-bottom: 10px;
}

.rate .el-tabs__header{
  margin: 0;
}

.rate .el-tabs--card>.el-tabs__header .el-tabs__item {
    border-bottom: 1px solid #c0c4cc;
    border-left: 1px solid #c0c4cc;
}

.rate .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none;
}

.rate .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  background-color: #fff;
  border-radius: 13px;
  border: 1px solid;
  background-color: #9cccff21;
}

.rate .list ul{
  background-color: #fff;
/*  padding: 0 12px;*/
}

.rate .list li {
  margin: 0;
}

.rate .list .one {
  border-top: 1px solid #f1f1f1;
  padding: 12px 0;
  width: 100%;
  margin: 0;
  /*display: -webkit-box;*/
}

.rate .list li .user_avatar{
  width: 13%;
  border-radius: 50%;
  margin: 0 13px;
  float: left;
}

.rate .list li .content{
  width: 75%;
  float: right;
  text-align: left;
  padding-right: 11px;
}

.rate .list li .content .time{
  float: right;
  font-size: 14px;
}

.rate .list li .rate{
  display: inline-block;
}

.rate .list li .score{
  font-size: 14px;
  margin: 11px 0;
}

.rate .list .assess{
  margin-bottom: 16px;
}

.rate .list .imgList li{
  float: left;
  width: 30%;
  margin-right: 9px;
  height: 85px;
}

.rate .list .imgList img{
  width: 100%;
  height: 100%;
}

</style>
