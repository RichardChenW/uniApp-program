export default {
	install(Vue){
		Vue.filter("toFixed",function(num){
			return Number(num).toFixed(2)
		})
	}
}