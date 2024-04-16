<script setup>
  import { ref } from 'vue';
  import BaseInputNumber from './components/BaseInputNumber.vue';

  const tempSI = ref(0);

  const tempCelsius = defineModel('celsius', {
    get: () => tempSI.value - 273.15,
    set: value => tempSI.value = value + 273.15,
  });

  const tempFahrenheit = defineModel('fahrenheit', {
    get: () => tempSI.value * 9 / 5 - 459.67,
    set: value => tempSI.value = (value + 459.67) * 5 / 9,
  });

  const tempKelvin = defineModel('kelvin', {
    get: () => tempSI.value,
    set: value => tempSI.value = value,
  });
</script>

<template>
  <BaseInputNumber step="0.1" min="-273.15" unit="°C" v-model="tempCelsius"/>
  <BaseInputNumber unit="°F" min="-459.67" v-model="tempFahrenheit"/>
  <BaseInputNumber unit="K" min="0" v-model="tempKelvin"/>
</template>

<style scoped>

</style>
