<template>
	<div>
		<h1>Categorías</h1>
		<b-button variant="dark" to="categorias/agregar">Agregar</b-button>
		<Table :items="categorias" :fields="campos" :busy="loading">
			<template slot="actions" slot-scope="{ item }">
				<b-button variant="danger" @click="onEliminar(item)"
					>Eliminar</b-button
				>
			</template>
		</Table>
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
				{ key: "actions", label: "Acciones" },
			],
		};
	},
	computed: {
		...mapState(["categorias", "loading"]),
	},
	methods: {
		...mapActions(["setCategorias"]),
		onEliminar(item) {
			this.$bvModal.msgBoxConfirm("¿Está seguro que desea eliminar?", {
				title: "Eliminar Categoría",
				size: "sm",
				buttonSize: "sm",
				okVariant: "danger",
				okTitle: "Aceptar",
				cancelTitle: "Cancelar",
				footerClass: "p-2",
				centered: true,
			});
		},
	},
	mounted() {
		this.setCategorias();
	},
};
</script>

<style></style>
