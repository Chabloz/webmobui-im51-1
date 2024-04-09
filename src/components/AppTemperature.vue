<script setup>

  defineProps({
    temperature: Number,
    unit: String,
  });

</script>

<template>
  <div>
    <span class="value">{{ temperature }} </span>
    <span class="unit">{{ unit }}</span>
  </div>
</template>

<style scoped>
  span {
    font-size: 2em;
  }
  span.value {
    font-weight: bold;
  }
  span.unit::after {
    content: "]";
  }
  span.unit::before {
    content: "[";
  }
</style>
