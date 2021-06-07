<template>
  <div>
    <h1>Editar Ticket</h1>
    <b-form class="formulario" @submit.prevent="guardarTicket()">
      <div class="inputs">
        <Input
          v-model="ticket.ticket_nombre"
          id="nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre del ticket"
          :maxlength="50"
          :disabled= true
          class="mt-3 col-10"
        />
        <Input
          v-model="ticket.ticket_descripcion"
          id="descripcion"
          titulo="Descripción"
          placeholder="Ingrese la descripción del ticket"
          :maxlength="100"
          class="mt-3 col-10"
        />
        <Select
          :items="optionsprioridad"
          v-model="ticket.ticket_prioridad"
          :vmodel="ticket.ticket_prioridad"
          id="prioridad"
          iditem="id"
          name="nombre"
          titulo="Prioridad"
          :error="erroresValidacion && !validarPrioridad"
          mensajeError="Es necesario ingresar la prioridad"
          class="mt-3 col-10"
        />
        <Select
          :items="personal"
          v-model="ticket.personal_id"
          :vmodel="ticket.personal_id"
          id="personal"
          iditem="personal_id"
          name="personal_nombre"
          lastname="personal_apellidos"
          titulo="Personal"
          :error="erroresValidacion && !validarPersonal"
          mensajeError="Es necesario ingresar el personal"
          class="mt-3 col-10"
        />
        <Select
          :items="categorias"
          v-model="ticket.categoria_id"
          :vmodel="ticket.categoria_id"
          id="categoria"
          iditem="categoria_id"
          name="categoria_nombre"
          titulo="Categoría"
          :error="erroresValidacion && !validarCategoria"
          mensajeError="Es necesario ingresar la categoria"
          class="mt-3 col-10"
        />
      </div>
      <b-button type="submit" class="mt-4 boton-guardar" variant="dark">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Select from "../../components/Select.vue";
import Input from "../../components/Input.vue";
import Vue from 'vue'

export default {
  name: "EditarTicket",
  components: {
    Select,
    Input,
  },
  data() {
    return {
      ticket: {
        ticket_nombre: "",
        ticket_descripcion: "",
        ticket_prioridad: "",
        personal_id: "",
        categoria_id: "",
      },
      selected: null,
      optionsprioridad: [
        { id: 1, nombre: "BAJA" },
        { id: 2, nombre: "MEDIA" },
        { id: 3, nombre: "ALTA" },
      ],
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["personal", "categorias"]),
    validarPrioridad() {
      return (
        this.ticket.ticket_prioridad !== null
      );
    },
    validarPersonal() {
      return (
        this.ticket.personal_id !== null
      );
    },
    validarCategoria() {
      return (
        this.ticket.categoria_id !== null
      );
    },
  },
  methods: {
    ...mapActions([
      "setPersonal",
      "setCategorias",
      "obtenerTicket",
      "editarTicket",
    ]),
    guardarTicket() {
      console.log(this.ticket)
      if (
        !(
          this.validarPrioridad &&
          this.validarPersonal &&
          this.validarCategoria
        )
      ) {
        // Error: No hacer nada
        this.erroresValidacion = true;
      } else {
        // Agregar ticket
        this.erroresValidacion = false;
        this.editarTicket({
          id: this.$route.params.id,
          params: this.ticket,
          onComplete: (res) => {
            this.$notify({
              type: "success",
              title: res.data.mensaje,
            });
            this.$router.push({
              name: "Tickets",
            });
          },
          onError: (err) => {
            this.$notify({
              type: "error",
              title: err.response.data.mensaje,
            });
          },
        });
      }
    },
  },
  // Life Cycle methods
  created() {
    this.setPersonal(), this.setCategorias(),
    this.obtenerTicket({
          id: this.$route.params.id,
          onComplete: res => Vue.set(this, 'ticket', res.data.data)
      })
  },
};

//TODO: Hacer que se ponga en el combo la opcion inicial y terminar el editar aqui en ticket
</script>

<style></style>

