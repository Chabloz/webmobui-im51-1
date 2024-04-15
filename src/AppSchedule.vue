<script setup>
import jsonSchedule from './mock/schedule.json';
import { ref, computed } from 'vue';

const schedule = ref(jsonSchedule);

const scheduleOrderByDate = computed(() => {
  return schedule.value.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
});

const hideHistory = ref(true);

const scheduleFiltered = computed(() => {
  return hideHistory.value ? scheduleOrderByDate.value.filter(item => {
    return new Date(item.start) > new Date();
  }) : scheduleOrderByDate.value;
});

</script>

<template>
  <button @click="hideHistory = !hideHistory">
    {{ hideHistory ? 'Show' : 'Hide' }} History
  </button>
  <ul>
    <li v-for="item in scheduleFiltered" :key="item.id">
      {{ item.label }}
      {{  item.start }}
    </li>
  </ul>
</template>

<style scoped>

</style>