<template>
	<div class="home">
		<template>
			<div class="filtrado">
				<Select
					:items="categorias"
					showAll="Mostrar todas las categorías"
					v-model="ticket.ticket_id"
					id="categoria"
					iditem="categoria_id"
					name="categoria_nombre"
					titulo="Ver por categorías"
					@filter="filtrarCategorias"
					class="col-5"
					
				/>
			</div>
			<div>

			<div class="tickets">
				<Card
					v-for="t in ticketsFiltrados"
					:key="t.ticket_id"
					:color="obtenerColor(t.ticket_estatus)"
					:id="t.ticket_id"
					:titulo="t.ticket_nombre"
					:mensaje="t.ticket_descripcion"
					:tags="[obtenerPrioridad(t.ticket_prioridad), obtenerEstatus(t.ticket_estatus)] "/>
			</div>


			</div>
		</template>
	</div>
</template>

<script>
import Select from "../components/Select.vue";
import Card from "../components/Card.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Home",
	components: {
		Select, Card
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
		},
	},
	methods: {
		...mapActions([
			"setTickets",
			"setCategorias",
			"obtenerTicketCategoria",
		]),
		obtenerColor(ticket_estatus) {
			if (ticket_estatus === "ABT") return "bg-danger";
			if (ticket_estatus === "ESP") return "bg-success";
			if (ticket_estatus === "FIN") return "bg-secondary";
		},
		obtenerEstatus(ticket_estatus) {
			if (ticket_estatus === "ABT") return "Abierto";
			if (ticket_estatus === "ESP") return "En espera";
			if (ticket_estatus === "FIN") return "Finalizado";
		},
		obtenerPrioridad(ticket_prioridad) {
			if (ticket_prioridad == 1) return "Baja";
			if (ticket_prioridad == 2) return "Media";
			if (ticket_prioridad == 3) return "Alta";
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

<style>
.tickets {
	display: inline-block;
	align-content: center;
	margin-top: 10px;
	/* justify-content: space-around; */
	width: 90%;
}

.filtrado {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
