import Vue from 'vue'
import App from './App'
import store from './store'
import request from './common/request.js'

 Vue.prototype.request=request
 
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
