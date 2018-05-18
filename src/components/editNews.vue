<template>
  <div class="editNews">
      <mt-header title="个人信息" fixed>
          <mt-button slot="left" @click="back">
              <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i><span>返回</span>
          </mt-button> 
      </mt-header>
      
      <div class="news">
        <mt-cell @click.native="addPic" is-link>
          <img :src="url" alt="" @click.stop="addPic">
          <input hidden type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="fileInput" >
        </mt-cell>
        <mt-cell title="昵称" @click.native="goEdit" is-link>
          <span>{{username}}</span>
        </mt-cell>
        <mt-cell title="性别" @click.native="sheetVisible = true" is-link>
          <span>{{sex}}</span>
        </mt-cell>
        <mt-cell title="生日" @click.native="open('picker4')" size="large" is-link>
          <span>{{birth}}</span>
        </mt-cell>
        <mt-cell title="常居地" @click.native="popup" is-link>
          <span style="color: #409eff" v-if="isshow">获精准推荐</span>
          <span v-else>{{ addressProvince }} {{ addressCity }}</span>
        </mt-cell>
        <mt-cell title="婚姻状态" @click.native="sheetVisible1 = true" is-link>
          <span style="color: #409eff" v-if="ishidden">让爱团更懂你</span>
          <span v-else>{{Marriage}}</span>
        </mt-cell>
        <mt-cell title="手机号" @click.native="goEdit1" is-link>
          <span>{{Tel}}</span>
        </mt-cell>
      </div>

      <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
      </mt-popup>

      <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
      <mt-actionsheet :actions="actions1" v-model="sheetVisible1" cancel-text=""></mt-actionsheet>

      <mt-datetime-picker
           ref="picker4"
           type="date"
           v-model="value4"
           year-format="{value} 年"
           month-format="{value} 月"
           date-format="{value} 日"
           @confirm="handleChange">
      </mt-datetime-picker>

  </div>
</template>

<script>
import { IndexList, IndexSection, Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex' 
import { api } from '@/global/api'
import Eurl from "../assets/head.png"

const address = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
};

export default {   
  data () {  
    return {  
      username: "",
      url: "",

      sheetVisible: false,
      actions: [],
      sex: "",
      value4: null,
      birth: "",
      isshow: true,
      ishidden: true,
      sheetVisible1: false,
      actions1: [],
      Marriage: "",
      Tel: "",

      addressSlots: [
        {
          flex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['北京'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      addressProvince: '北京',
      addressCity: '北京',



      popupVisible4: false,
    }  
  },  
  mounted:function(){  
    this.username = window.localStorage.getItem('username') 
    this.Tel = this.$store.state.mutation.tel
    this.sex = this.$store.state.mutation.sex
    this.birth = this.$store.state.mutation.birth
    this.addressProvince = this.$store.state.mutation.addressProvince
    this.addressCity = this.$store.state.mutation.addressCity
    this.isshow = this.$store.state.mutation.Eshow
    this.Marriage = this.$store.state.mutation.Marriage
    this.ishidden = this.$store.state.mutation.ishidden

    let Eimg = window.localStorage.getItem('useravatar');
    if(Eimg == null){
      this.url = Eurl;
    }
    else{
      this.url = Eimg
    }

    this.actions = [{
      name: '男',
      method: this.choosesex
    },{
      name: '女', 
      method: this.choosesex
    }
    ];

    this.actions1 = [{
      name: '未婚',
      method: this.isMarriage
    },{
      name: '已婚', 
      method: this.isMarriage
    }
    ];
  },  
  methods: {  
    back:function(){
      this.$router.go(-1);
    },

    popup(){
      this.popupVisible4 = true; 
      this.isshow = false; 
      this.$store.dispatch("setaddressProvince", this.addressProvince)
      this.$store.dispatch("setaddressCity", this.addressCity)
      this.$store.dispatch("setisshow", this.isshow)
    },

    goBack() {
      history.go(-1);
    },

    choosesex:function(actions,index){
      this.sex=actions.name
      this.$store.dispatch("setSex", actions.name)
    },

    onAddressChange(picker, values) {
      picker.setSlotValues(1, address[values[0]]);
      this.addressProvince = values[0];
      this.addressCity = values[1];
    },

    // 头像
    addPic (e) {
         let vm = this;
         let add = document.querySelector("input[type=file]")
         add.click()
         return false;
    },
    fileInput (e) {
         var files = e.target.files
         console.log(files)
         if(!files.length) return;
         this.createImage(files, e);
    },
    createImage (files, e) {
       let vm = this;
       // lrz图片先压缩在加载、
       this.lrz(files[0], { width: 480 }).then(function(rst) {
        vm.url = rst.base64;
        return rst;
       }).always(function() {
       // 清空文件上传控件的值
       e.target.value = null;
       });
       setTimeout(this.changeHead,300);
    },

    changeHead(){
      console.log(this.url)
      window.localStorage.setItem('useravatar',this.url)
    },

    // 生日
    open(picker) {
       this.$refs[picker].open();
     },

    handleChange(value) {
      var d = value;  
      // 日期格式转换
      this.birth =d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() ; 
      this.$store.dispatch("setBirth", this.birth)
    },

    // 婚姻
    isMarriage:function(actions,index){
      this.ishidden = false;
      this.Marriage=actions.name
      this.$store.dispatch("setMarriage", this.Marriage)
      this.$store.dispatch("setishidden", this.ishidden)
    },

    goEdit(){
      this.$store.dispatch("setTitle", "修改昵称")
      this.$store.dispatch("setTag", "昵称")
      this.$router.push({path: '/edit'});
    },

    goEdit1(){
      this.$store.dispatch("setTitle", "绑定手机号")
      this.$store.dispatch("setTag", "手机号")
      this.$router.push({path: '/edit'});
    }

  }  
}  
</script>
<style>
.editNews li{
  margin: 0;
}

.editNews .mint-header{
  height: 45px;
  background-color: #66b1ff;
  color: #333;
  font-size: 16px;
}

.editNews .mint-header span{
  margin-left: 12px;
  position: relative;
  top: -4px;
}

.editNews .news{
  margin-top: 46px;
}

.editNews .news .mint-cell{
  min-height: 74px;
}

.editNews .news img{
  background-color: #ccc;
  height: 100%;
  width: 30%;
  float: left;
  border-radius: 35px;
}

.editNews .mint-cell-title{
  flex: none;
}

.editNews .mint-cell-wrapper{
  text-align: left;
}

.editNews .mint-cell-value span{
  position: absolute;
  right: 38px;
}

.editNews .mint-popup{
  width: 100%;
}
</style>
