<template>
  <div>
    <label :for="id">{{ titulo }}</label>
    <div>
      <select
        :id="id"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
      >
        <option :value="null">– Selecciona una opción –</option>
        <option
          v-for="item in items"
          :value="item[iditem]"
          :key="item[iditem]"
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
