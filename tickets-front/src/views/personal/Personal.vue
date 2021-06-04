<template>
  <div>
    <h1>Personal</h1>
    <Table :items="personal" :fields="campos" /> 
  </div>
</template>

<script>
import Table from "../../components/Table";
import { mapState, mapActions } from "vuex";

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
      ],
    };
  },
  computed: {
    ...mapState(["personal"]),
  },
  methods: {
    ...mapActions(["setPersonal"]),
  },
  // Life cycle methods
  created() {
    this.setPersonal();
  },
};
</script>

<style></style>
