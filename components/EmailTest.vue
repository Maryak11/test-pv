<template>
  <div class="flex flex-col">
    <span
      for="email"
      class="text-white"
      >{{ label || 'Введите email' }}
    </span>
    <input
      id="email"
      v-model="email"
      type="text"
      placeholder="email"
      class="rounded-md border-none p-2 text-xl text-white outline-none"
      :class="[error && !email ? 'border-2 bg-red-700' : 'bg-slate-700']"
    />
  </div>
  <!-- Обертка для прокидывания кастомных кнопок из компонента в футер модалки, главное указать id="customButtons" -->
  <section id="customButtons">
    <button
      class="w-full max-w-[50%] rounded-md bg-green-500 p-2 text-lg text-white transition-all hover:bg-zinc-700"
      @click="validateEmail"
    >
      Да
    </button>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  label?: string;
}>();
const email = ref<string>('');
const error = ref(false);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const validateEmail = () => {
  if (!email.value) {
    error.value = true;
    return;
  }
  emit('close');
};
</script>
