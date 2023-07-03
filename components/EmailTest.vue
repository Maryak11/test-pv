<template>
  <div class="">
    <div class="flex flex-col">
      <span
        for="email"
        class="text-white"
        >{{ label || 'Введите email' }}</span
      >
      <input
        id="email"
        v-model="email"
        type="text"
        placeholder="email"
        class="rounded-md border-none bg-slate-700 p-2 text-xl text-white outline-none"
        :class="{ 'border-2 bg-red-700': error && !email }"
      />
    </div>

    <ModalButtonsWrapper>
      <button
        class="w-full max-w-[50%] rounded-md bg-green-500 p-2 text-lg text-white transition-all hover:bg-zinc-700"
        @click="validateEmail"
      >
        Да
      </button>
    </ModalButtonsWrapper>
  </div>
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
