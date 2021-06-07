<template>
	<div class="home">
		<template>
			<div>
				<Select
					:items="categorias"
					showAll="Mostrar todas las categorías"
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
					:items="ticketsFiltrados"
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
		ticketsFiltrados() {
			if (this.categoriaIdFiltro == 0) {
				return this.tickets;
			} else {
				return this.tickets.filter(row => {
					return row.categoria_id == this.categoriaIdFiltro;
				})
			}
		}
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
			this.categoriaIdFiltro = idC;
		},
	},

	data() {
		return {
			categoriaIdFiltro: 0,
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
			ticket: {
				ticket_nombre: "",
				ticket_descripcion: "",
				ticket_prioridad: "",
				personal_id: "",
				categoria_id: "",
			},
		};
	},
	mounted() {
		this.setTickets();
		this.setCategorias();
	},
};
</script>

<style></style>
