import Vue from 'vue';
import Vuex from 'vuex';
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'

Vue.use(Vuex);

let store = new Vuex.Store({
	modules:{
		moduleCart,
		moduleUser,
	}
});

export default store;