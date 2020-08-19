import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./request/api";
import "./components/_globals";
import "./style/base.scss";

Vue.config.productionTip = true;
Vue.config.devtools = true;
Vue.prototype.$api = api;

// 百度统计
/**
 * 
 * var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
	var hm = document.createElement("script");
	hm.src = "token";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();
 */

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
