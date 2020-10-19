import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		isPop:false,
		isConcatPop:false,
    },
	getters: {
		
	},
    mutations: {
		showPop(state,val){
			state.isPop=val
		},
		showConcatPop(state,val){
			state.isConcatPop=val
		}
    },
	actions:{
	
	}
})

export default store
