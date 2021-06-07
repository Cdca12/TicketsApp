<template>
  <div>
    <h1>Categorías</h1>
    <div class="boton-agregar">
      <b-button variant="dark" to="categorias/agregar">
        <b-icon icon="plus" /> Agregar
      </b-button>
    </div>
    <Table :items="categorias" :fields="campos" :busy="loading" >
      <template slot="actions" slot-scope="{ item }">
        <b-button variant="danger" @click="onEliminar(item)">
          <b-icon icon="trash" /> Eliminar
        </b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  name: "Categorias",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "categoria_id", label: "Clave" },
        { key: "categoria_nombre", label: "Nombre" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["categorias", "loading"]),
  },
  methods: {
    ...mapActions(["setCategorias", "eliminarCategoria"]),
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("¿Está seguro que desea eliminar?", {
          title: "Eliminar Categoría",
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
            console.log(item);
            this.eliminarCategoria({
              id: item.item.categoria_id,

              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setCategorias(), 1000);
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
  mounted() {
    this.setCategorias();
  },
};
</script>

<style></style>
