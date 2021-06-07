<template>
  <div>
    <label :for="id">{{ titulo }}</label>
    <div>
      <select
        :id="id"
        class="form-control"
        :disabled="disabled"
        @change="$emit('filter', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      >
        <option :value="null" selected disabled>– Selecciona una opción –</option>
        <option
          v-for="item in items"
          :value="item[iditem]"
          :key="item[iditem]"
          :selected="item[iditem]==vmodel"
        >
          {{ item[name] }} {{ item[lastname] }}
        </option>
      </select>
    </div>
    <span v-if="error" class="text-danger">{{ mensajeError }}</span>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    items: Array,
    vmodel: {
      type: [String, Number],
      default: null,
    },
    iditem: String,
    name: String,
    lastname: String,
    id: {
      type: [String, Number],
      required: true,
    },
    titulo: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    mensajeError: {
      type: String,
      default: "Campo obligatorio",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
