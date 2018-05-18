<template>
  <div class="bar">
      <mt-header title="爱团APP用户全国分布图" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>

<!--       <div class="choice">
        <mt-button type="primary" size="small" @click="getData">2017年数据</mt-button>
        <mt-button type="primary" size="small" @click="getData2">2018年数据</mt-button>
      </div> -->

      <div class="myEchart">      
        <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
      </div>

  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex' 
import { api } from '@/global/api'

export default {   
  data () {  
    return {  
      mapData: '',
      chinaData: ''
    }  
  },  
  mounted:function(){  
    var vm = this;

    // 获取中国城市经纬度数据
    vm.getChinaData();

    //获取json数据
    vm.getData();
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    getData(){
      //获取map数据
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.get(api.map,{params:{value: '2017'}}).then(function(response){ 
        this.mapData = response.data.Info;
        this.drawLine();
        Indicator.close();

      },function(response){
        alert('bar.json请求失败了')
      })
    },

    getChinaData(){
      this.$http.get(api.chinaMap,{params:{value: '2017'}}).then(function(response){ 
        this.chinaData = response.data;
      },function(response){
        alert('bar.json请求失败了')
      })
    },


    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))

        //自适应
        window.onresize = myChart.resize;

        var data = this.mapData;

        console.log(this.chinaData,'pppp');

        var geoCoordMap = this.chinaData;

        function convertData(data) {
           var res = [];
           for (var i = 0; i < data.length; i++) {
               var geoCoord = geoCoordMap[data[i].name];
               if (geoCoord) {
                   res.push({
                       name: data[i].name,
                       value: geoCoord.concat(data[i].value)
                   });
               }
           }
           return res;
        };

        function randomValue() {
            return Math.round(Math.random()*1000);
        }



        // 绘制图表
        myChart.setOption({
          tooltip: {
              trigger: 'item',
              textStyle: {
                  align: 'left'
              },
              formatter: function(params) {
                  console.log(params, 'ooo');
                  if (params.componentSubType == "scatter") {
                      var showTips = "城市：" + params.data.name + "<br/>用户人数：" + params.data.value + " 万人";
                      return showTips;
                  }
                  if (params.componentSubType == "map") {
                      var showTips = "省份：" + params.data.name + "<br/>用户人数：" + params.data.value + " 万人";
                      return showTips;
                  }
              }
          },
          visualMap: {
              min: 0,
              max: 1500,
              left: 'left',
              top: 'bottom',
              text: ['High','Low'],
              seriesIndex: [1],
              inRange: {
                  color: ['#e0ffff', '#006edd']
              },
              calculable : true
          },
          geo: {
              map: 'china',
              roam: true,
              label: {
                  normal: {
                      show: true,
                      textStyle: {
                          color: 'rgba(0,0,0,0.4)'
                      }
                  }
              },
              itemStyle: {
                  normal:{
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                  },
                  emphasis:{
                      areaColor: null,
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          },
          series : [
             {
                 type: 'scatter',
                 coordinateSystem: 'geo',
                 data: convertData(data),
                 symbolSize: 18,
                 symbol: 'pin',
                 // symbolRotate: 35,
                 label: {
                     normal: {
                         formatter: '{b}',
                         position: 'right',
                         show: false
                     },
                     emphasis: {
                         show: true
                     }
                 },
                 itemStyle: {
                     normal: {
                          color: '#F06C00'
                     }
                 }
              },
              {
                  name: 'categoryA',
                  type: 'map',
                  geoIndex: 0,
                  // tooltip: {show: false},
                  data:[
                      {name: '北京', value: randomValue()},
                      {name: '天津', value: randomValue()},
                      {name: '上海', value: randomValue()},
                      {name: '重庆', value: randomValue()},
                      {name: '河北', value: randomValue()},
                      {name: '河南', value: randomValue()},
                      {name: '云南', value: randomValue()},
                      {name: '辽宁', value: randomValue()},
                      {name: '黑龙江', value: randomValue()},
                      {name: '湖南', value: randomValue()},
                      {name: '安徽', value: randomValue()},
                      {name: '山东', value: randomValue()},
                      {name: '新疆', value: randomValue()},
                      {name: '江苏', value: randomValue()},
                      {name: '浙江', value: randomValue()},
                      {name: '江西', value: randomValue()},
                      {name: '湖北', value: randomValue()},
                      {name: '广西', value: randomValue()},
                      {name: '甘肃', value: randomValue()},
                      {name: '山西', value: randomValue()},
                      {name: '内蒙古', value: randomValue()},
                      {name: '陕西', value: randomValue()},
                      {name: '吉林', value: randomValue()},
                      {name: '福建', value: randomValue()},
                      {name: '贵州', value: randomValue()},
                      {name: '广东', value: randomValue()},
                      {name: '青海', value: randomValue()},
                      {name: '西藏', value: randomValue()},
                      {name: '四川', value: randomValue()},
                      {name: '宁夏', value: randomValue()},
                      {name: '海南', value: randomValue()},
                      {name: '台湾', value: randomValue()},
                      {name: '香港', value: randomValue()},
                      {name: '澳门', value: randomValue()}
                  ]
              }
          ]
        });

    },

  }  
}  
</script>

<style>
.bar .mint-header{
  height: 45px;
  background-color: #66b1ff8f;
  color: #333;
  font-size: 16px;
}

.bar .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.bar .choice{
  margin-top: 60px;
  text-align: left;
  margin-left: 10%;
}

.bar {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.bar .myEchart {
  margin-top: 10%;
}   

</style>
