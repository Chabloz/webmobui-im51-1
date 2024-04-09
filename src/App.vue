<script setup>
  import AppTemperature from './components/AppTemperature.vue';

  import { computed, ref } from 'vue';

  const tempSI = ref(10);

  const tempCelsius = computed(() => {
    return tempSI.value - 273.15;
  })

  const tempFaranheit = computed(() => {
    return tempSI.value * 9/5 - 459.67;
  });

</script>

<template>
  <AppTemperature :temperature="tempCelsius" unit="°C"/>
  <AppTemperature :temperature="tempFaranheit" unit="°F"/>
  <AppTemperature :temperature="tempSI" unit="K"/>

  <span>Hello</span>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
