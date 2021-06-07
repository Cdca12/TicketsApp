<template>
  <div>
    <h1>Tickets</h1>
    <div class="boton-agregar">
    <b-button  variant="primary" to="tickets/agregar">
      <b-icon icon="plus" /> Agregar
    </b-button>


    </div>
    
    <Table :items="tickets" :fields="campos">   
      <template slot="actions" slot-scope="{ item }" class="acciones">
        <b-button variant="primary" class="mb-2" @click="onEditarTicket(item)">
          <b-icon icon="pencil-square" /> Editar
        </b-button>
        <b-button variant="outline-primary" class="mb-2 mx-2" @click="onEditarEstatus(item)">Cambiar estatus</b-button>
        <b-button variant="danger" @click="onEliminar(item)">
          <b-icon icon="trash" /> Eliminar
        </b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "../../components/Table";

export default {
  name: "Tickets",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "ticket_id", label: "Clave" },
        { key: "ticket_nombre", label: "Nombre" },
        { key: "ticket_descripcion", label: "Descripción" },
        { key: "ticket_prioridad", label: "Prioridad" },
        { key: "ticket_estatus", label: "Estatus" },
        { key: "personal_nombre", label: "Personal" },
        { key: "categoria_nombre", label: "Categoría" },
        { key: "actions", label: "Acciones", thStyle: { width: '30%'} }
      ],
    };
  },
  computed: {
    ...mapState(["tickets"]),
  },
  methods: {
    ...mapActions(["setTickets", "eliminarTicket"]),
    onEditarTicket(item) {
      this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.ticket_id,
        },
      });
    },
    onEditarEstatus(item) {
      this.$router.push({
        name: "EditarEstatus",
        params: {
          id: item.item.ticket_id,
        },
      });
    },
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("¿Está seguro que desea eliminar?", {
          title: "Eliminar Ticket",
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
            this.eliminarTicket({
              id: item.item.ticket_id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setTickets(), 1000);
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
    this.setTickets();
  },
};
</script>

<style>
.boton-agregar {
  float: right;
  margin-right: 5%;
}  

.acciones {
	max-width: 50px;
	font-size: 20px;
  background-color: red;
}
</style>