<template>
  <div class="echart">
      <mt-header title="团购消费种类占比图" fixed>
          <mt-button slot="left"  @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>

      <div class="choice">
        <mt-button type="primary" size="small" v-if="show" @click="getWorld">获取全球数据</mt-button>
        <mt-button type="primary" size="small" v-else @click="getChina">获取中国数据</mt-button>
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
      show: true,
      legends: '',
      pieData: ''
    }  
  },  
  mounted:function(){  
    var vm = this;

    //获取json数据
    vm.getChina();
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    getChina(){
      this.show = true;

      //获取pie数据
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.get(api.pie,{params:{value: 'china'}}).then(function(response){ 
        let datas = response.data.China;
        var a = [];
        var b = [];
        datas.forEach((item,index) => {
          a.push(item.name);
          b.push({
            value: item.value,
            name: item.name
          })
        })

        this.legends = a;
        this.pieData = b;

        this.drawLine();
        Indicator.close();

      },function(response){
        alert('pie.json请求失败了')
      })
    },

    getWorld(){
      this.show = false;

      //获取pie2数据
      this.$http.get(api.pie2,{params:{value: 'world'}}).then(function(response){ 
        let datas = response.data.World;
        var a = [];
        var b = [];
        datas.forEach((item,index) => {
          a.push(item.name);
          b.push({
            value: item.value,
            name: item.name
          })
        })

        this.legends = a;
        this.pieData = b;

        this.drawLine();

      },function(response){
        alert('pie2.json请求失败了')
      })
    },

    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))

        //自适应
        window.onresize = myChart.resize;

        // 绘制图表
        myChart.setOption({
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} 万 ({d}%)"
          },
          legend: {
              type: 'scroll',
              bottom: 10,
              left: 'center',
              data: this.legends
          },
          toolbox: {
              show: true,
              feature: {
                  dataView: {readOnly: false},
                  restore: {},
                  saveAsImage: {}
              }
          },
          series: [
              {
                  name:'团购消费种类占比',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:this.pieData
              }
          ]
        });
    },

  }  
}  
</script>

<style>
.echart .mint-header{
  height: 45px;
  background-color: #66b1ff8f;
  color: #333;
  font-size: 16px;
}

.echart .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.echart .choice{
  margin-top: 60px;
  text-align: left;
  margin-left: 10%;
}

.echart {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

</style>
