<template>
  <Teleport
    v-if="mounted"
    to="#buttons"
  >
    <slot />
  </Teleport>
</template>

<script setup>
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
onUnmounted(() => {
  mounted.value = false;
});
</script>
