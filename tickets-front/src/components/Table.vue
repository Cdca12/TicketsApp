<template>
	<div>
		<b-table class="tabla" stripe hover :busy="busy" :items="items" :fields="fields" >
			<template #table-busy>
				<div class="text-center text-danger my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong>Loading...</strong>
				</div>
			</template>

			// Bootstrap
			<template #cell(actions)="data" >
				<slot class="align-middle" name="actions" :item="data" > </slot>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
	name: "Table",
	props: {
		items: Array,
		fields: Array,
		busy: Boolean,
	},
};
</script>

<style>


.tabla {
	background-color: white;
	box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.527);
	border-radius: 5px;
}

</style>
