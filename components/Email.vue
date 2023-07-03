<template>
  <div class="">
    <div class="flex flex-col">
      <span
        for="email"
        class="text-white"
        >Введите email</span
      >
      <input
        id="email"
        v-model="email"
        type="text"
        placeholder="email"
        class="rounded-md border-2 border-none bg-slate-700 p-2 text-xl text-white outline-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>('');

// const emit = defineEmits<{
//   (e: 'close'): void;
// }>();

defineExpose({
  fields: {
    email,
  },
});
</script>
