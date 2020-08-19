import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/home",
			name: "home",
			component: () =>
				import(/* webpackChunkName:"home" */ "./views/Home/Index.vue")
		},
		{
			path: "*",
			redirect: "/home"
		}
	]
});

// router.beforeEach(() => {});

// router.afterEach(() => {});

export default router;
