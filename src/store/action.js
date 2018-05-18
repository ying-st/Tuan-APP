export default {
	hasLogin: ({ commit }) => {
		if(window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
			commit('hasLogin')
		}else {
			console.log('没有登录')
		}	
	},
	noLogin: ({ commit }) => {
		if(window.localStorage.getItem('username') == null && window.localStorage.getItem('password') == null){
			commit('noLogin')
		}
	},
	setUsername: ({ commit }, username) => {
		commit('setUsername', username)
	},
	setUserinfo: ({commit}, userinfo) =>{
		commit('setUserinfo', userinfo)
	},
	setNews: ({ commit }, news) => {
		commit('setNews', news)
	},
	setBuyinfo: ({commit}, info) => {
		commit('setBuyinfo', info)
	},
	cutBuyinfo: ({commit}, index) => {
		commit('cutBuyinfo', index)
	},
	setReceive: ({commit}, obj ) => {
		commit('setReceive', obj)
	},
	setDel: ({commit}, obj) => {
		commit('setDel', obj)
	},
	setUserinfo: ({commit}, userinfo) =>{
		commit('setUserinfo', userinfo)
	},
	// setCity: ({commit}, info) => {
	// 	commit('setCity', info)
	// }
	setCity: ({ commit }, city) => {
		commit('setCity', city)
	},

	setTitle: ({ commit }, Etitle) => {
		commit('setTitle', Etitle)
	},

	setTag: ({ commit }, tag) => {
		commit('setTag', tag)
	},

	setTel: ({ commit }, tel) => {
		commit('setTel', tel)
	},

	setSex: ({ commit }, sex) => {
		commit('setSex', sex)
	},

	setBirth: ({ commit }, birth) => {
		commit('setBirth', birth)
	},

	setaddressProvince: ({ commit }, addressProvince) => {
		commit('setaddressProvince', addressProvince)
	},

	setaddressCity: ({ commit }, addressCity) => {
		commit('setaddressCity', addressCity)
	},

	setisshow: ({ commit }, Eshow) => {
		commit('setisshow', Eshow)
	},

	setMarriage: ({ commit }, Marriage) => {
		commit('setMarriage', Marriage)
	},

	setishidden: ({ commit }, ishidden) => {
		commit('setishidden', ishidden)
	},

	// 披萨发表评价
	setRateinfo: ({commit}, info) => {
		commit('setRateinfo', info)
	},

	// 寿司发表评价
	setRateinfo2: ({commit}, info) => {
		commit('setRateinfo2', info)
	},

	setSarg: ({commit}, Sarg) => {
		commit('setSarg', Sarg)
	},

	setBeconsum: ({commit}, info) => {
		commit('setBeconsum', info)
	},

	cutBeconsum: ({commit}, index) => {
		commit('cutBeconsum', index)
	},

	setAlconsum: ({commit}, info) => {
		commit('setAlconsum', info)
	},

	cutAlconsum: ({commit}, index) => {
		commit('cutAlconsum', index)
	},

	// 导航
	setTab: ({commit}, tab) => {
		commit('setTab', tab)
	},

	setType: ({commit}, types) => {
		commit('setType', types)
	},

	// 收藏
	setCollect: ({commit}, info) => {
		commit('setCollect', info)
	},

	// 取消收藏
	cutCollect: ({commit}, index) => {
		commit('cutCollect', index)
	},

	// 收藏图标是否显示
	setshowheart: ({ commit }, showheart) => {
		commit('setshowheart', showheart)
	},

	// 搜索历史
	setHistory: ({commit}, info) => {
		commit('setHistory', info)
	},

	cutHistory: ({commit}, index) => {
		commit('cutHistory', index)
	},

	cutAlHistory: ({commit}) => {
		commit('cutAlHistory')
	},

	// 我的足迹
	setFootprint: ({commit}, info) => {
		commit('setFootprint', info)
	},

	// 删除足迹
	cutFootprint: ({commit}, index) => {
		commit('cutFootprint', index)
	},

	// 删除全部足迹
	cutAlFootprint: ({commit}) => {
		commit('cutAlFootprint')
	}

}