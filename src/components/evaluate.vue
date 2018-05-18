<template>
  <div class="evaluate">
    <mt-header title="点评列表" fixed>
        <mt-button class="cancel" slot="left"  @click="back">
          <span>取消</span>
        </mt-button> 
        <mt-button class="rate" slot="right"  @click="getData">
          <span>发表</span>
        </mt-button> 
    </mt-header>

    <!-- 评分 -->
    <div class="content">
      <span>评分</span>
      <div class="ERate">
        <el-rate
          v-model="value2"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </div>
    </div>

    <!-- 评价内容 -->
    <div class="judge">
      <mt-field v-model="judge" placeholder="亲，菜品的口味如何，环境怎么样，服务满意吗？写下你的感受吧~" type="textarea" rows="6"></mt-field>
    </div>

    <div class="upload">
      <el-upload v-model="imgs"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :onError="uploadError"
        :onSuccess="uploadSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- <span>上传图片</span> -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { api } from '@/global/api'
import {Toast,MessageBox} from "mint-ui"

export default {   
  data () {  
    return {  
      value2: null,
      dialogImageUrl: '',
      dialogVisible: false,
      judge: '',
      imgs: []
    }  
  },  
  mounted:function(){  
    
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    // getData(){
    //   if(this.value2 == 0){
    //     MessageBox.alert('请先评分!', '提示');
    //   } else if(this.judge == ''){
    //     MessageBox.alert('请填写消费感受!', '提示');
    //   } else {
    //     let Obj ={}
    //     Obj.score = this.value2
    //     Obj.judge = this.judge
    //     Obj.imgs = this.imgs
    //     Obj.username = window.localStorage.getItem('username')
    //     var date = new Date();
    //     var year = date.getFullYear();
    //     var month = date.getMonth()+1;
    //     var day = date.getDate();
    //     var hour = date.getHours();
    //     var minute = date.getMinutes();
    //     var second = date.getSeconds();
    //     Obj.time = year + '年' + month + '月' + day + '日';
    //     Obj.key = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second;
    //     let Eimg = window.localStorage.getItem('useravatar');
    //     if(Eimg == null){
    //       Obj.head = "../assets/head.png";
    //     }
    //     else{
    //       Obj.head = Eimg
    //     }
    //     console.log(Obj,'评价内容')
    //     this.$store.dispatch('setRateinfo',Obj)
    //     let order = this.$store.state.mutation.news
    //     this.$store.dispatch('setAlconsum',order)
    //     let consumData = this.$store.state.mutation.beconsum;
    //     let i = consumData.indexOf(order)
    //     this.$store.dispatch('cutBeconsum', i)

    //     MessageBox.confirm('', {
    //         message: '评价成功',
    //         title: '提示',
    //         confirmButtonText: '查看评价',
    //         cancelButtonText: '返回'
    //     }).then(action => {
    //         if (action == 'confirm') {
    //             console.log('abc');
    //             this.$router.push({
    //               path: '/goods'
    //             })
    //         }
    //     }).catch(err => {
    //         if (err == 'cancel') {
    //             this.$router.go(-1);
    //         }
    //     });
    //   }

    // },

    getData(){
      let order = this.$store.state.mutation.news
      if(this.value2 == 0){
        MessageBox.alert('请先评分!', '提示');
      } else if(this.judge == ''){
        MessageBox.alert('请填写消费感受!', '提示');
      } else{
        let Obj ={}
        Obj.score = this.value2
        Obj.judge = this.judge
        Obj.imgs = this.imgs
        Obj.username = window.localStorage.getItem('username')
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        Obj.time = year + '年' + month + '月' + day + '日';
        Obj.key = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second;
        let Eimg = window.localStorage.getItem('useravatar');
        if(Eimg == null){
          Obj.head = "../assets/head.png";
        }
        else{
          Obj.head = Eimg
        }
        console.log(Obj,'评价内容')
        if(order.id == 1 || order.id == 2){
          this.$store.dispatch('setRateinfo',Obj)
        }else{
          this.$store.dispatch('setRateinfo2',Obj)
        }
        this.$store.dispatch('setAlconsum',order)
        let consumData = this.$store.state.mutation.beconsum;
        let i = consumData.indexOf(order)
        this.$store.dispatch('cutBeconsum', i)

        MessageBox.confirm('', {
            message: '评价成功',
            title: '提示',
            confirmButtonText: '查看评价',
            cancelButtonText: '返回'
        }).then(action => {
            if (action == 'confirm') {
                console.log('abc');
                this.$router.push({
                  path: '/goods'
                })
            }
        }).catch(err => {
            if (err == 'cancel') {
                this.$router.go(-1);
            }
        });
      }

    },


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      console.log('上传文件', response)
      this.imgs.push(file.url)
    },
    // 上传错误
    uploadError (response, file, fileList) {
      Toast("上传失败，请重试！");
      console.log('上传失败，请重试！')
    },
  }  
}  
</script>

<style>
.evaluate .mint-header{
  height: 45px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
}

.evaluate .mint-header .cancel span{
  margin-left: 12px;
  position: relative;
  color: #409eff;
}

.evaluate .mint-header .rate{
  background-color: #409eff;
  color: #fff;
  padding: 0 15px;
  border-radius: 8px; 
  height: 32px;
}

.evaluate .title{
  background-color: #fff;
  /*text-align: left;*/
  color: #409eff;
  padding: 10px;
}

.evaluate .content{
  margin-top: 47px;
  background-color: #fff;
  text-align: left;
  padding: 18px 10px;
  font-size: 20px;
}

.evaluate .content .ERate{
  display: inline-block;
  padding-left: 20px;
}

.evaluate .content .el-rate__icon{
  font-size: 27px;
  margin-top: -5px;
}

.evaluate .judge{
  margin-top: 12px;
}

.evaluate .upload{
  margin-top: 12px;
  background-color: #fff;
  padding: 20px 12px;
  /*display: -webkit-box;*/
}

.evaluate .upload .el-upload--picture-card{
  background-color: #e4e4e4;
  width: 100px;
  height: 100px;
  line-height: 105px;
}

.evaluate .upload .el-upload-list--picture-card .el-upload-list__item{
  width: 100px;
  height: 100px;
  float: left;
}

.evaluate .el-upload{
  display: grid;
}

.evaluate .el-upload .el-icon-plus{
  line-height: unset;
}

</style>
