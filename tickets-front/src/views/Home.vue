<template>
	<div class="home">
		<template>
			<div>
				<Select
					:items="categorias"
					v-model="ticket.ticket_id"
					id="categoria"
					iditem="categoria_id"
					name="categoria_nombre"
					titulo="Ver por categorías"
					@filter="filtrarCategorias"
					class="mt-3"
				/>
			</div>
			<div>
				<b-table
					striped
					hover
					:items="tickets"
					:fields="campos"
					:tbody-tr-class="rowClass"
				></b-table>
			</div>
		</template>
	</div>
</template>

<script>
import Select from "../components/Select.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Home",
	components: {
		Select,
	},
	computed: {
		...mapState(["tickets", "categorias"]),
	},
	methods: {
		...mapActions([
			"setTickets",
			"setCategorias",
			"obtenerTicketCategoria",
		]),
		rowClass(item, type) {
			if (!item || type !== "row") return;
			if (item.ticket_estatus === "ABT") return "table-danger";
			if (item.ticket_estatus === "ESP") return "table-success";
			if (item.ticket_estatus === "FIN") return "table-dark";
		},
		filtrarCategorias(idC) {
			this.categoriaSeleccionada = idC;
			if (!idC) {
				this.setTickets();
			} else {
				this.obtenerTicketCategoria(idC);
			}
		},
	},

	data() {
		return {
			ticketC: 0,
			// Note 'isActive' is left out and will not appear in the rendered table
			campos: [
				{
					key: "ticket_nombre",
					label: "Nombre del ticket",
				},
				{
					key: "categoria_nombre",
					label: "Categoría",
				},
			],
			// selected: "0",
			ticket: {
				ticket_nombre: "",
				ticket_descripcion: "",
				ticket_prioridad: "",
				personal_id: "",
				categoria_id: "",
			},
			categoriaSeleccionada: null,
		};
	},
	mounted() {
		this.setTickets();
		this.setCategorias();
	},
};
</script>

<style></style>
