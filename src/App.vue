<script setup>
  import { ref, watch, computed } from 'vue';

  import TheHeader from './components/TheHeader.vue';
  import TheNav from './components/TheNav.vue';
  import AppSchedule from './AppSchedule.vue';
  import AppTemperature from './AppTemperature.vue';

  const routes = {
    '#schedule': AppSchedule,
    '#temperature': AppTemperature,
  }

  const currentPath = ref(window.location.hash);

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
  })

  const currentView = computed(() => {
    return routes[currentPath.value] ?? AppTemperature;
  })

</script>

<template>
  <TheHeader />
  <TheNav />
  <component :is="currentView" />
</template>

<style scoped>

</style>