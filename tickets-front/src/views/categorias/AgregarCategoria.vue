<template>
	<div>
		<h1>Agregar Categoria</h1>
		<b-form @submit.prevent="guardarCategoria()">
			<Input
				v-model="categoria.categoria_nombre"
				id="nombre"
				titulo="Nombre"
				placeholder="Ingrese el nombre de la categoría"
				:maxlength="50"
				:error="erroresValidacion && !validacionNombre"
				mensajeError="Es necesario ingresar el nombre"
				class="mt-3"
			/>
			<b-button type="submit" class="mt-2" variant="primary"
				>Guardar</b-button
			>
		</b-form>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../../components/Input";
export default {
	name: "AgregarCategoria",
	components: {
		Input,
	},
	data() {
		return {
			categoria: {
				categoria_nombre: "",
			},
			erroresValidacion: false,
		};
	},
	computed: {
		validacionNombre() {
			return (
				this.categoria.categoria_nombre !== undefined &&
				this.categoria.categoria_nombre.trim() !== ""
			);
		},
	},
	methods: {
		...mapActions(["crearCategoria"]),
		guardarCategoria() {
			if (this.validacionNombre) {
				this.erroresValidacion = false;
				console.log("hola");
				//Guardar
				this.crearCategoria({
					params: this.categoria,
					onComplete: (response) => {
						this.$notify({
							type: "success",
							title: response.data.mensaje,
						});
						this.$router.push({
							name: "Categorias",
						});
					},
					onError: (error) => {
						this.$notify({
							type: "error",
							title: error.response.data.mensaje,
						});
					},
				});
			} else {
				this.erroresValidacion = true;
			}
		},
	},
};
</script>

<style></style>
