<template>
  <div>
    <h1>Agregar Ticket</h1>
    <b-form class="formulario" @submit.prevent="agregarTicket()">
      <div class="inputs">
        <Input
          v-model="ticket.ticket_nombre"
          id="nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre del ticket"
          :maxlength="50"
          :error="erroresValidacion && !validarNombre"
          mensajeError="Es necesario ingresar el nombre"
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
            id="categoria"
            iditem="categoria_id"
            name="categoria_nombre"
            titulo="Categoría"
            :error="erroresValidacion && !validarCategoria"
            mensajeError="Es necesario ingresar la categoria"
            class="mt-3 col-10"
          />
        </div>
    
      <b-button type="submit"  class="mt-4 boton-guardar" variant="dark">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Select from '../../components/Select.vue';
import Input from '../../components/Input.vue';

export default {
  name: "AgregarTicket",
  components: {
    Select,
    Input
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
        { id: 3, nombre: "ALTA" }
      ],
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["personal", "categorias"]),
    validarNombre() {
      return (
        this.ticket.ticket_nombre !== undefined &&
        this.ticket.ticket_nombre.trim() !== ""
      );
    },
    validarPrioridad() {
      return (
        this.ticket.ticket_prioridad !== ""
      );
    },
    validarPersonal() {
      return (
        this.ticket.personal_id !== ""
      );
    },
    validarCategoria() {
      return (
        this.ticket.categoria_id !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearTicket", "setPersonal", "setCategorias"]),
    agregarTicket() {
      if (
        !(
          this.validarNombre &&
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
        this.crearTicket({
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
    this.setPersonal(),
    this.setCategorias();
  },
};
</script>

<style>
.formulario {
  margin: auto;
  margin-top: 30px;
  width: 50%;
  box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.527);
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  background-color: white;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boton-guardar {
  padding-left: 30px;
  padding-right: 30px;
  margin: 10px;
}

</style>
