<template>
	<div id="app">
		<b-navbar type="dark" variant="dark" class="justify-content-md-center" toggleable="lg">
			<b-navbar-brand tag="h1" class="mx-4" to="/">
				Inicio
			</b-navbar-brand>
			<b-navbar-brand tag="h1" class="mx-4" to="/tickets">
				Tickets
			</b-navbar-brand>
			<b-navbar-brand tag="h1" class="mx-4" to="/personal">
				Personal
			</b-navbar-brand>
			<b-navbar-brand tag="h1" class="mx-4" to="/categorias">
				Categorías
			</b-navbar-brand>
		</b-navbar>
		<router-view class="container  mt-3" />
		<notifications position="bottom right" />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}


</style>
