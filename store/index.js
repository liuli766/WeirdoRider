import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		isPop:false,
		isConcatPop:false,
		iscomminput:false,
    },
	getters: {
		
	},
    mutations: {
		showPop(state,val){
			state.isPop=val
		},
		showConcatPop(state,val){
			state.isConcatPop=val
		},
		Showcomminput(state,val){
			state.iscomminput=val
		}
    },
	actions:{
	
	}
})

export default store
