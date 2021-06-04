import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Categorias from "../views/categorias/Categorias.vue";
import AgregarCategoria from "../views/categorias/AgregarCategoria.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/categorias",
		name: "Categorias",
		component: Categorias,
	},
	{
		path: "/categorias/agregar",
		name: "AgregarCategoria",
		component: AgregarCategoria,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
