import Vue from 'vue';
import Vuex from 'vuex';
import moduleCart from './cart.js'

Vue.use(Vuex);

let store = new Vuex.Store({
	modules:{
		moduleCart
	}
});

export default store;