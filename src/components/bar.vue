<template>
  <div class="bar">
      <mt-header title="团购交易额总览图" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>

      <div class="choice">
        <mt-button type="primary" size="small" @click="getData">2017年数据</mt-button>
        <mt-button type="primary" size="small" @click="getData2">2018年数据</mt-button>
      </div>

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
      title: '',
      dataAxis: '',
      barData: ''
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取json数据
    vm.getData();

    // this.drawLine();
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    getData(){
      //获取bar数据
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.get(api.bar,{params:{value: '2017'}}).then(function(response){ 
        let datas = response.data;
        let barDatas = response.data.Info;
        this.title = datas.title;
        var a = [];
        var b = [];
        barDatas.forEach((item,index) => {
          a.push(item.month);
          b.push(item.value);
        })

        this.dataAxis = a;
        this.barData = b;

        this.drawLine();
        Indicator.close();

      },function(response){
        alert('bar.json请求失败了')
      })
    },

    getData2(){
      //获取bar2数据
      this.$http.get(api.bar2,{params:{value: '2018'}}).then(function(response){ 
        let datas = response.data;
        let barDatas = response.data.Info;
        this.title = datas.title;
        var a = [];
        var b = [];
        barDatas.forEach((item,index) => {
          a.push(item.month);
          b.push(item.value);
        })

        this.dataAxis = a;
        this.barData = b;

        this.drawLine();

      },function(response){
        alert('bar2.json请求失败了')
      })
    },


    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))

        //自适应
        window.onresize = myChart.resize;

        // 绘制图表
        myChart.setOption({
          title: {
              text: this.title,
              left: 'center'
          },
          toolbox: {
              show: true,
              feature: {
                  dataView: {readOnly: false},
                  magicType: {type: ['line', 'bar']},
                  restore: {},
                  saveAsImage: {}
              }
          },
          xAxis: {
              name: '月份',
              data: this.dataAxis,
              axisLabel: {
                  interval: 0, //横轴信息全部显示  
                  rotate: 30, //30度角倾斜显示
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: true
              },
              z: 10
          },
          yAxis: {
              name: '交易额/亿元',
              axisLine: {
                  show: true
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  textStyle: {
                      color: '#999'
                  }
              }
          },
          dataZoom: [
              {
                  type: 'inside'
              }
          ],
          series: [
              {
                  type: 'bar',
                  label: {
                      normal: {
                          show: true,
                          position: 'top',
                          textStyle: {
                              color: 'red'
                          }
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: new this.$echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#83bff6'},
                                  {offset: 0.5, color: '#188df0'},
                                  {offset: 1, color: '#188df0'}
                              ]
                          )
                      },
                      emphasis: {
                          color: new this.$echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#2378f7'},
                                  {offset: 0.7, color: '#2378f7'},
                                  {offset: 1, color: '#83bff6'}
                              ]
                          )
                      }
                  },
                  data: this.barData
              }
          ],
        });

        var zoomSize = 6;
        var dataAxis = this.dataAxis;
        var data = this.barData;
        myChart.on('click', function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
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
