<template>
  <div>
    <h1>Agregar Ticket</h1>
    <b-form @submit.prevent="agregarTicket()">
      <Input
        v-model="ticket.ticket_nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre del ticket"
        :maxlength="50"
        :error="erroresValidacion && !validarNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mt-3"
      />
      <Input
        v-model="ticket.ticket_descripcion"
        id="descripcion"
        titulo="Descripción"
        placeholder="Ingrese la descripción del ticket"
        :maxlength="100"
        class="mt-3"
      />
      <Select
        :items="optionsprioridad"
        v-model="ticket.ticket_prioridad"
        id="prioridad"
        iditem="id"
        name="nombre"
        titulo="Prioridad"
        class="mt-3"
      />
      <Select
        :items="personal"
        v-model="ticket.personal_id"
        id="personal"
        iditem="personal_id"
        name="personal_nombre"
        lastname="personal_apellidos"
        titulo="Personal"
        class="mt-3"
      />
      <Select
        :items="categorias"
        v-model="ticket.categoria_id"
        id="categoria"
        iditem="categoria_id"
        name="categoria_nombre"
        titulo="Categoría"
        class="mt-3"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
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
        this.ticket.ticket_prioridad !== undefined &&
        this.ticket.ticket_prioridad.trim() !== ""
      );
    },
    validarPersonal() {
      return (
        this.ticket.personal_id !== undefined &&
        this.ticket.personal_id.trim() !== ""
      );
    },
    validarCategoria() {
      return (
        this.ticket.categoria_id !== undefined &&
        this.ticket.categoria_id.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearTickets", "setPersonal", "setCategorias"]),
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
        // Agregar personal
        this.erroresValidacion = false;
        this.crearTickets({
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

<style></style>
