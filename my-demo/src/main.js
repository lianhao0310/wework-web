// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import store from "./vuex/store.js";
import utils from "./assets/js/utils.js";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI,{size: "small"});
Vue.prototype.axios = axios;
Vue.prototype.utils = utils;
global.BASE_API = "http://localhost:18080";
new Vue({
	el: "#app",
	router,
	store,
	template: "<App/>",
	components: { App }
});
