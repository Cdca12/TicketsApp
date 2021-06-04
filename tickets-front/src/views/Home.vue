<template>
	<div class="home">
		<template>
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
import { mapState, mapActions } from "vuex";

export default {
	name: "Home",
	components: {},
	computed: {
		...mapState(["tickets", "loading"]),
	},
	methods: {
		...mapActions(["setTickets"]),
		rowClass(item, type) {
			if (!item || type !== "row") return;
			if (item.ticket_estatus === "ABT") return "table-danger";
			if (item.ticket_estatus === "ESP") return "table-success";
			if (item.ticket_estatus === "FIN") return "table-dark";
		},
	},

	data() {
		return {
			// Note 'isActive' is left out and will not appear in the rendered table
			campos: [
				{
					key: "ticket_nombre",
					label: "Nombre del ticket",
					sortable: false,
				},
				{
					key: "categoria_nombre",
					label: "Categoría",
					sortable: true,
				},
			],
		};
	},
	mounted() {
		this.setTickets();
	},
};
</script>

<style>
.sr-only {
	display: none;
}
</style>
