import App from './App'

// 导入 vuex
import store from '@/store/store.js'

import plugin from '@/plugins/tools.js'
Vue.use(plugin)

// 1. 导入网络请求包
import { $http } from "@escook/request-miniprogram"
uni.$http = $http;
// 1.1 设置请求根路径
uni.$http.baseUrl = "https://www.uinav.com";

// 2. 设置请求拦截器，在请求开始之前做一些事情
$http.beforeRequest = (options)=>{
    uni.showLoading({
        title:"数据加载中"
    })
	if(options.url.indexOf("/my/") !== -1){
		// 为请求添加 Authorization 
		options.header = {
			'Authorization':state.moduleUser.token,
		}
	}
};
// 3. 设置响应拦截器，请求完成之后做一些事情
$http.afterRequest = ()=>{
    uni.hideLoading()
}

// 1. 导入数据请求失败之后使用的弹窗
import showMsg from "./tools/showMsg.js"
uni.$showMsg = showMsg


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif