<template>
  <div class="edit">
    <mt-header :title="title" fixed>
        <mt-button slot="left" @click="back">
            <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
        </mt-button> 
    </mt-header>

    <div class="content">
      <mt-field :label="name" placeholder="请输入手机号" :attr="{ maxlength: 10 }" v-model="content"></mt-field>

      <div class="buttonwrap">
        <button class="save" @click="save">修改</button>
      </div>
    </div>

  </div>
</template>

<script> 
import {mapGetters,mapActions} from 'vuex'

export default {  
  data () {  
    return {  
      title: "",
      name: "",
      content: ""
    }  
  },  
  mounted:function(){  
    this.title = this.$store.state.mutation.Etitle
    this.name = this.$store.state.mutation.tag
    if(this.name == "昵称"){
      this.content = window.localStorage.getItem('username') 
    }
    
  },  
  watch: {

  },
  methods: {  
    back:function(){
      this.$router.go(-1);
    },
    save(){
      if(this.name == "昵称"){
        window.localStorage.setItem("username",this.content)
        this.$router.go(-1);
      }
      else{
        this.$store.dispatch("setTel", this.content)
        this.$router.go(-1);
      }
    }
  }  
}  
</script>

<style>
.edit .mint-header{
  height: 45px;
  background-color: #66b1ff;
  color: #333;
  font-size: 16px;
}

.edit .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.edit .content{
  margin-top: 64px;
}

/*保存按钮*/
.edit .buttonwrap button{
  display: block;
    width: 95%;
    font-size: 16px;
    margin: 20px auto;
    height: 52px;
    border: none;
    background-color: #409eff;
    color: #fff;
}
</style>