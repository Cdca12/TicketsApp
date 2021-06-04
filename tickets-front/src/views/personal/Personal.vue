<template>
  <div>
    <h1>Personal</h1>
    <b-button variant="primary" to="personal/agregar">Agregar</b-button>
    <Table :items="personal" :fields="campos">
      <template slot="actions" slot-scope="{ item }">
        <b-button variant="primary" class="me-1" @click="onEditar(item)"
          >Editar</b-button
        >
        <b-button variant="danger" @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "../../components/Table";

export default {
  name: "Personal",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "personal_id", label: "Clave" },
        { key: "personal_nombre", label: "Nombre" },
        { key: "personal_apellidos", label: "Apellidos" },
        { key: "personal_telefono", label: "Telefono" },
        { key: "personal_direccion", label: "Dirección" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["personal"]),
  },
  methods: {
    ...mapActions(["setPersonal", "eliminarPersonal"]),
    onEditar(item) {
      this.$router.push({
        name: "EditarPersonal",
        params: {
          id: item.item.personal_id,
        },
      });
    },
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("¿Está seguro que desea eliminar?", {
          title: "Eliminar Personal",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarPersonal({
              id: item.item.personal_id,

              onComplete: (response) => {
                this.$notify({
                  type: "warn",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonal(), 1000);
              },
              onError: (err) => {
                this.$notify({
                  type: "error",
                  title: err.response.data.mensaje,
                });
              },
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  // Life cycle methods
  created() {
    this.setPersonal();
  },
};
</script>

<style></style>
