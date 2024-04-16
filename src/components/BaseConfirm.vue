<script setup>
  const emit = defineEmits(['confirm', 'cancel']);

  function confirm() {
    emit('confirm');
  }

  function cancel() {
    emit('cancel');
  }

</script>

<template>
  <div>
    <slot></slot>
    <button @click="confirm()">Confirm</button>
    <button @click="cancel()">Cancel</button>
  </div>
</template>

<style scoped>
 /* modal */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>