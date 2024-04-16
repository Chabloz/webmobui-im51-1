<script setup>
import jsonSchedule from './mock/schedule.json';
import { ref, computed } from 'vue';
import BaseConfirm from './components/BaseConfirm.vue';

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

let currentSchedule = null;
const showConfirm = ref(false);

function deleteSomething() {
  showConfirm.value = false;
  schedule.value = schedule.value.filter(item => item !== currentSchedule);
}

function askConfirmation(item) {
  currentSchedule = item
  showConfirm.value = true;
}

function closeConfirm() {
  showConfirm.value = false;
}

</script>

<template>

  <BaseConfirm
      v-if="showConfirm"
      @confirm="deleteSomething()"
      @cancel="closeConfirm()">
    Are you <b>sure</b> you want to delete this item?
  </BaseConfirm>

  <button @click="hideHistory = !hideHistory">
    {{ hideHistory ? 'Show' : 'Hide' }} History
  </button>
  <ul>
    <li v-for="item in scheduleFiltered" :key="item.id">
      {{ item.label }}
      {{  item.start }}
      <button @click="askConfirmation(item)">delete</button>
    </li>
  </ul>
</template>

<style scoped>

</style>