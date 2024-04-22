<script setup>
import jsonSchedule from './mock/schedule.json';
import { ref, computed, onUnmounted } from 'vue';
import BaseConfirm from './components/BaseConfirm.vue';
import { useJsonStorage } from './composables/jsonStorage.js';
import { useKeyboard } from './composables/keyboard.js';

const schedule = ref(jsonSchedule);

const scheduleOrderByDate = computed(() => {
  return schedule.value.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
});

const {data: hideHistory} = useJsonStorage("showHistory", true);

const {data: selectedCourse} = useJsonStorage("selectedCourse", null);
selectedCourse.value = "WebMobUi";

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

// window.addEventListener("keyup", (event) => {
//   console.log(event.key.toUpperCase())
//   const k = event.key.toUpperCase();
//   if (k != "H") return;

//   hideHistory.value = !hideHistory.value;
// });

const { keyboard } = useKeyboard();
keyboard.onKey("h", () => {
  console.log("H pressed");
  hideHistory.value = !hideHistory.value;
});
keyboard.onKeys(['Control', 's'], () => {
  console.log("ctrl + s pressed");
});



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