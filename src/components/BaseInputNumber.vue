<script setup>
  import { round } from '../utils/math.js';
  const props = defineProps({
    unit: {
      type: String,
      required: false,
      default: false,
    },
    decimalPlaces: {
      type: Number,
      required: false,
      default: 2,
    },
  });

  const model = defineModel({
    get() {
      return round(props.modelValue, props.decimalPlaces);
    }
  });
</script>

<template>
  <div>
    <input type="number" v-model="model" v-bind="$attrs">
    <span v-if="unit">{{ unit }}</span>
  </div>
</template>

<style scoped>
  input {
    display: inline-block;
    margin: 0.5rem 1rem;
  }
</style>