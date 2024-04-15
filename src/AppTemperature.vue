<script setup>
  import { ref } from 'vue';
  import BaseInputNumber from './components/BaseInputNumber.vue';

  const tempSI = ref(0);

  const tempCelsius = defineModel('celsius', {
    get() {
      return tempSI.value - 273.15;
    },
    set(value) {
      tempSI.value = value + 273.15;
    }
  });

  const tempFahrenheit = defineModel('fahrenheit', {
    get() {
      return tempSI.value * 9 / 5 - 459.67;
    },
    set(value) {
      tempSI.value = (value + 459.67) * 5 / 9;
    }
  });

  const tempKelvin = defineModel('kelvin', {
    get() {
      return tempSI.value;
    },
    set(value) {
      tempSI.value = value;
    }
  });
</script>

<template>
  <BaseInputNumber unit="°C" v-model="tempCelsius"/>
  <BaseInputNumber unit="°F" v-model="tempFahrenheit"/>
  <BaseInputNumber unit="K" v-model="tempKelvin"/>
</template>

<style scoped>

</style>
