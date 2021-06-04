<template>
	<div>
		<h1>Categorías</h1>
		<b-button variant="dark" to="/agregarCategoria">Agregar</b-button>
		<Table :items="categorias" :fields="campos" :busy="loading"> </Table>
	</div>
</template>

<script>
import Table from "../../components/Table";
import { mapState, mapActions } from "vuex";
export default {
	name: "Categorias",
	components: {
		Table,
	},
	data() {
		return {
			campos: [
				{ key: "categoria_id", label: "Clave" },
				{ key: "categoria_nombre", label: "Nombre" },
			],
		};
	},
	computed: {
		...mapState(["categorias", "loading"]),
	},
	methods: {
		...mapActions(["setCategorias"]),
	},
	mounted() {
		this.setCategorias();
	},
};
</script>

<style></style>
