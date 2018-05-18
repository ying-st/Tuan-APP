import getters from './getter.js';
const state = {
	tab: 'tab1',
	isShow: true,
	isLogin: false,
	username: '',
	news: '',
	buyinfo: [],
	userinfo: {},
	city: '广州',
	Etitle: '',
	tag: '',
	tel: '设置',
	sex: '设置',
	birth: '设置',
	addressProvince: '北京',
	addressCity: '北京',
	Eshow: true,
	Marriage: '',
	ishidden: true,
	rateinfo: [],
	rateinfo2: [],
	Sarg: '',
	beconsum: [],
	Alconsum: [],
	types: '',
	collect: [],
	se_history: [],
	showheart: true,
	footprint: []
}
const mutations = {
	hasLogin: (state) => {
		state.isLogin = true
	},
	noLogin: (state) => {
		state.isLogin = false
	},
	setUsername: (state, username) => {
		state.username = username
	},
	setUserinfo: (state, userinfo) =>{
		window.localStorage.setItem('useravatar',userinfo.avatar)
		state.userinfo = userinfo
		console.log(state.userinfo)
	},
	setNews: (state, news) => {
		state.news = news
	},
	setBuyinfo: (state, info) => {
		state.buyinfo.push(info)
		console.log(state.buyinfo)
	},
	cutBuyinfo: (state, index) => {
		state.buyinfo.splice(index,1)
		console.log(state.buyinfo)
	},
	setReceive: (state, obj) => {
		console.log(obj.receive,obj.index,'kookooko')
		console.log(state.buyinfo[obj.index].receive,'huhuhduhu')
		state.buyinfo[obj.index].receive = obj.receive
		console.log(state.buyinfo[obj.index].receive,'huudugdug')
	},
	setDel: (state, obj) => {
		console.log(state.buyinfo[obj.index])
		state.buyinfo[obj.index].del = obj.del
		console.log(state.buyinfo[obj.index].del)
	},
	setUserinfo: (state, userinfo) =>{
		window.localStorage.setItem('useravatar',userinfo.avatar)
		state.userinfo = userinfo
		console.log(state.userinfo)
	},
	// setCity: (state, info) => {
	// 	state.city.push(info)
	// 	console.log(state.city)
	// }
	setCity: (state, city) => {
		state.city = city
	},

	setTitle: (state, Etitle) => {
		state.Etitle = Etitle
	},

	setTag: (state, tag) => {
		state.tag = tag
	},

	setTel: (state, tel) => {
		state.tel = tel
	},

	setSex: (state, sex) => {
		state.sex = sex
	},

	setBirth: (state, birth) => {
		state.birth = birth
	},

	setaddressProvince: (state, addressProvince) => {
		state.addressProvince = addressProvince
	},

	setaddressCity: (state, addressCity) => {
		state.addressCity = addressCity
	},

	setisshow: (state, Eshow) => {
		state.Eshow = Eshow
	},

	setMarriage: (state, Marriage) => {
		state.Marriage = Marriage
	},

	setishidden: (state, ishidden) => {
		state.ishidden = ishidden
	},

	setRateinfo: (state, info) => {
		state.rateinfo.push(info)
		console.log(state.rateinfo)
	},

	setRateinfo2: (state, info) => {
		state.rateinfo2.push(info)
		console.log(state.rateinfo2)
	},

	setSarg: (state, Sarg) => {
		state.Sarg = Sarg
	},

	setBeconsum: (state, info) => {
		state.beconsum.push(info)
		console.log(state.beconsum)
	},

	cutBeconsum: (state, index) => {
		state.beconsum.splice(index,1)
		console.log(state.beconsum)
	},

	setAlconsum: (state, info) => {
		state.Alconsum.push(info)
		console.log(state.Alconsum)
	},

	cutAlconsum: (state, index) => {
		state.Alconsum.splice(index,1)
		console.log(state.Alconsum)
	},

	// 导航
	setTab: (state, tab) => {
		state.tab = tab
	},

	setType: (state, types) => {
		state.types = types
	},

	// 收藏
	setCollect: (state, info) => {
		state.collect.push(info)
		console.log(state.collect)
	},

	// 取消收藏
	cutCollect: (state, index) => {
		state.collect.splice(index,1)
		console.log(state.collect)
	},

	// 收藏图标是否显示
	setshowheart: (state, showheart) => {
		state.showheart = showheart
	},

	// 搜索历史
	setHistory: (state, info) => {
		state.se_history.push(info)
		console.log(state.se_history)
	},

	cutHistory: (state, index) => {
		state.se_history.splice(index,1)
		console.log(state.se_history)
	},

	cutAlHistory: (state) => {
		let i = state.se_history.length
		state.se_history.splice(0,i)
		console.log(state.se_history)
	},

	// 我的足迹
	setFootprint: (state, info) => {
		state.footprint.push(info)
		console.log(state.footprint)
	},

	// 删除足迹
	cutFootprint: (state, index) => {
		state.footprint.splice(index,1)
		console.log(state.footprint)
	},

	// 删除全部足迹
	cutAlFootprint: (state) => {
		let i = state.footprint.length
		state.footprint.splice(0,i)
		console.log(state.footprint)
	},

}
export default {
	getters,
	state,
	mutations
}