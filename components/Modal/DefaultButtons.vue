<template>
  <button
    class="w-full max-w-[50%] rounded-md bg-green-500 p-2 text-lg text-white transition-all hover:bg-zinc-700"
    @click="emit('resolve')"
  >
    {{ button?.text || 'Да' }}
  </button>
  <button
    v-if="!button"
    class="w-full max-w-[50%] rounded-md bg-red-500 p-1 text-lg text-white transition-all hover:bg-zinc-700"
    @click="emit('reject')"
  >
    Нет
  </button>
</template>

<script setup lang="ts">
import { IButton } from '~/hook/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  button?: IButton;
}>();

const emit = defineEmits<{
  (e: 'resolve'): void;
  (e: 'reject'): void;
}>();
</script>
