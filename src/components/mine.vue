<template>  
  <div class="mine">
  <!-- 头部 -->
    <div class="m_top">
      <i class="fa fa-envelope-o fa-2x" aria-hidden="true"></i>
    </div>


    <div class="haslogin" v-if="login">
      <div class="m_login">
        <img :src="url">
          <div class="click_login">
            <div class="login_title">{{username}}</div>
            <span>欢迎来到爱团~</span>
            <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
          </div> 
      </div>
    </div>



  <!-- 点击登录 --> 
  <div v-else class="m_login">
    <router-link to="./login">

      <img src="../assets/head.png">
      
        <div class="click_login">
        <div class="login_title">点击登录</div>
        <span>登录享优惠</span>
<!--           <div class="login_title">ying</div>
          <span>欢迎来到爱团~</span> -->
          <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
        </div> 
    </router-link>
  </div>

  <!-- 卡券 -->
  <div class="credits">
    <el-row :gutter="2">
      <el-col :span="6"><div class="grid-content bg-purple">
        <i class="fa fa-money fa-2x" aria-hidden="true"></i><div>卡券</div><span>0张</span>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <i class="fa fa-money fa-2x" aria-hidden="true"></i><div>积分</div><span>0</span>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <i class="fa fa-money fa-2x" aria-hidden="true"></i><div>余额</div><span>￥0.00</span>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <i class="fa fa-money fa-2x" aria-hidden="true"></i><div>我的钱包</div><span>办信用卡</span>
      </div></el-col>
    </el-row>
  </div>


  <!-- 收藏，列表 -->
  <div class="collect">
    <ul>
      <li @click="edit">
        <div>
          <i class="fa fa-vcard" aria-hidden="true" style="color:#7f3ce6;"></i><span>个人信息</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      <hr></hr>
      <li>
        <div @click="echart">
          <i class="fa fa-commenting" aria-hidden="true" style="color:green;"></i><span>数据分析</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      <hr></hr>
      <li>
        <div @click="mycollect">
          <i class="fa fa-heart" aria-hidden="true" style="color:red;"></i><span>我的收藏</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      <hr></hr>
      <li>
        <div @click="footprint">
          <i class="fa fa-clock-o" aria-hidden="true" style="color:gray;"></i><span>我的足迹</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      <hr></hr>
      <li>
        <div>
          <i class="fa fa-black-tie" aria-hidden="true" style="color:rgb(255, 198, 54);"></i><span>会员等级</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      <hr></hr>
      <li>
        <div @click="about">
          <i class="fa fa-cog" aria-hidden="true" style="color:rgb(74, 165, 240);"></i><span>设置</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      <hr></hr>
    </ul>
  </div>
  <div class="buttonwrap" v-if="login">
    <button class="logout" @click="logout">退出登录</button>
  </div>

  </div>  
</template>  
  
<script> 
import {mapGetters,mapActions} from 'vuex'
import { MessageBox } from 'mint-ui';

export default {  
  data () {  
    return {  
      url: ""

    }  
  },  
  mounted:function(){  
    let username = window.localStorage.getItem('username') 
    this.$store.dispatch('setUsername', username)
    this.isLogin = this.$store.state.mutation.isLogin
    this.url = window.localStorage.getItem('useravatar')
  },  
  computed: mapGetters(['login','username']),
  watch: {

  },
  methods: {  
    logout () {
      window.localStorage.clear()
      this.$store.dispatch('noLogin')
      this.$router.push({path: '/'});
    },
    edit(){
      if (this.$store.state.mutation.isLogin){
        this.$router.push({path: '/editNews'});
      }
      else{
        MessageBox.confirm('请先登录','提示').then(action => {
          this.$router.push({path:'/login'})
        }).catch(() => {
          this.$router.push({path:'/'})
        });
      }
    },

    echart(){
      this.$router.push({path: '/echartList'});
    },

    about(){
      this.$router.push({path: '/about'});
    },

    mycollect(){
      if (this.$store.state.mutation.isLogin){
        this.$router.push({path: '/mycollect'});
      }
      else{
        MessageBox.confirm('请先登录','提示').then(action => {
          this.$router.push({path:'/login'})
        }).catch(() => {
          this.$router.push({path:'/'})
        });
      }
    },

    footprint(){
      if (this.$store.state.mutation.isLogin){
        this.$router.push({path: '/footprint'});
      }
      else{
        MessageBox.confirm('请先登录','提示').then(action => {
          this.$router.push({path:'/login'})
        }).catch(() => {
          this.$router.push({path:'/'})
        });
      }
    }

  }  
}  
</script>

<style>
/*头部*/
.mine .m_top{
  height: 26px;
  background-color: #29d2c1;
  text-align: right;
  padding: 10px 20px 10px 0px;
}

.mine .m_top i{
  font-size: 26px;
  color: white;
}
  

/*点击登录*/
.mine .m_login{
  height: 70px;
  background-color: #29d2c1;
  padding: 2px 20px 15px 30px;
  position: relative;
  margin-bottom: 12px;
  margin-top: -1px;
}

.mine .m_login img{
  background-color: #ccc;
  height: 100%;
  width: 21%;
  float: left;
  border-radius: 35px;
}

.mine .m_login .click_login{
  float: left;
  width: 46%;
  height: 100%;
  padding-left: 16px;
  color: white;
  text-align: left;
  letter-spacing: 2px;
  position: left;
}

.mine .m_login .click_login .login_title{
  font-weight: 500;
  padding: 6px 0px 6px 0px;
}
    
.mine .m_login .click_login span{
  font-size: 2px;
}

.mine .m_login .click_login i{
  position: absolute;
  right: 12px;
  top: 22px;
}


/*卡券*/
.mine .credits{
  height: 73px;
  background-color: white;
  padding: 14px 0px 14px 0px;
  font-size: 13px;
  margin-bottom: 12px;
}

.mine .credits .grid-content {
  min-height: 52px;
}

.mine .credits .bg-purple div{
  margin-top: 8px;
  margin-bottom: 6px;
}

.mine .credits .bg-purple span{
  color: #ccc;
  font-size: 12px;
}

/*收藏，列表*/
.mine .collect{
  background-color: white;
  text-align: left;
}

.mine .collect ul{
  margin: 0; 
}

.mine .collect ul hr{
  margin: 0; 
  border: 1px solid #EDEDED;
}

.mine .collect li{
  margin: 0;
  background-color: white;
  width: 100%;
  position: relative;
}

.mine .collect li div{
  height: 22px;
  padding: 12px 10px 12px 20px;  
}

.mine .collect li span{
  margin-left: 10px;
}

.mine .collect li .fa-angle-right{
  position: absolute;
  right: 18px;
  top: 13px;
}


/*退出按钮*/
.buttonwrap button{
  display: block;
    width: 95%;
    font-size: 16px;
    margin: 10px auto;
    height: 52px;
    border: none;
    background-color: red;
    color: #fff;
    margin-bottom: 80px;
}


</style>
