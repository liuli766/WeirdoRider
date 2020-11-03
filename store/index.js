import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isPop: false, //取货弹框是否显示
		isConcatPop: false,
		iscomminput: false,
		loginStatus: false, //登录状态，
		userId: '', //用户id
		tel:'',//一键拨号电话
		order:{},//抢单
		userinfo:{},//用户信息
		userReal:false,//实名认证状态
	},
	getters: {},
	mutations: {
		showPop(state, val) { //取货弹框
			state.isPop = val
		},
		showConcatPop(state, val) {
			state.isConcatPop = val
		},
		Showcomminput(state, val) {
			state.iscomminput = val
		},
		login(state, user) { //登录
			state.loginStatus = true
			state.userId = user
			uni.setStorageSync('user', JSON.stringify(user));
		},
		initUser(state) {//初始化用户信息
			let user = uni.getStorageSync('user');
			if (user) {
				state.userId = JSON.parse(user)
				state.loginStatus = true
			}
		},
		handuserReal(state,val){ //实名认证
			state.userReal=val
		},
		Call(state,val){ //拨号
			state.tel=val
		},
		Order(state,val){ //抢单
			state.order=val
		}
		
	},
	actions: {

	}
})

export default store
