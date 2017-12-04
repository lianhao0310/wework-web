import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Article from "@/components/Article";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/",
			name: "article",
			component: Article
		}
	]
});
