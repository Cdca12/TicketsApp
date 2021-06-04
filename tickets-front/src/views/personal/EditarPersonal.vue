<template>
  <div>
    <h1>Editar Personal</h1>
    <b-form @submit.prevent="guardarPersonal()">
      <Input
        v-model="persona.personal_nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre de la persona"
        :maxlength="50"
        :error="erroresValidacion && !validarNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mt-3"
      />
      <Input
        v-model="persona.personal_apellidos"
        id="apellidos"
        titulo="Apellidos"
        placeholder="Ingrese los apellidos de la persona"
        :maxlength="80"
        :error="erroresValidacion && !validarApellidos"
        mensajeError="Es necesario ingresar los apellidos de la persona"
        class="mt-3"
      />
      <Input
        v-model="persona.personal_telefono"
        id="telefono"
        titulo="Telefono"
        tipo="number"
        placeholder="Ingrese el teléfono de la persona"
        :maxlength="10"
        :error="erroresValidacion && !validarTelefono"
        mensajeError="Es necesario ingresar el teléfono"
        class="mt-3"
      />
      <Input
        v-model="persona.personal_direccion"
        id="direccion"
        titulo="Dirección"
        placeholder="Ingrese la dirección de la persona"
        :maxlength="150"
        :error="erroresValidacion && !validarDireccion"
        mensajeError="Es necesario ingresar la dirección"
        class="mt-3"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Input from "../../components/Input";
import { mapActions } from "vuex";
import Vue from 'vue'

export default {
  name: "EditarPersonal",
  components: {
    Input,
  },
  data() {
    return {
      persona: {
        personal_nombre: "",
        personal_apellidos: "",
        personal_telefono: "",
        personal_direccion: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validarNombre() {
      return (
        this.persona.personal_nombre !== undefined &&
        this.persona.personal_nombre.trim() !== ""
      );
    },
    validarApellidos() {
      return (
        this.persona.personal_apellidos !== undefined &&
        this.persona.personal_apellidos.trim() !== ""
      );
    },
    validarTelefono() {
      return (
        this.persona.personal_telefono !== undefined &&
        this.persona.personal_telefono.trim() !== ""
      );
    },
    validarDireccion() {
      return (
        this.persona.personal_direccion !== undefined &&
        this.persona.personal_direccion.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(['obtenerPersonal', 'editarPersonal']),
    guardarPersonal() {
      if (
        !(
          this.validarNombre &&
          this.validarApellidos &&
          this.validarTelefono &&
          this.validarDireccion
        )
      ) {
        // Error: No hacer nada
        this.erroresValidacion = true;
      } else {
        // Editar personal
        this.erroresValidacion = false;
        this.editarPersonal({
            id: this.$route.params.id,
            params: this.persona,
          onComplete: (res) => {
            this.$notify({
              type: "success",
              title: res.data.mensaje,
            });
            this.$router.push({
              name: "Personal",
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
      this.obtenerPersonal({
          id: this.$route.params.id,
          onComplete: res => Vue.set(this, 'persona', res.data.data)
      })
  }
};
</script>

<style></style>
