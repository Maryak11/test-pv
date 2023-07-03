<template>
  <section
    class="relative flex items-center justify-center rounded-tl-xl rounded-tr-xl bg-[#01143f] p-2 text-xl font-semibold text-[#589fe7]"
  >
    {{ header }}

    <div
      v-if="timer"
      class="absolute left-4 top-2 text-white"
    >
      {{ timer }}
    </div>

    <div
      class="absolute right-2 top-1 cursor-pointer text-white transition-all hover:opacity-50"
      @click.stop="emit('close')"
    >
      <Icon
        name="close"
        size="lg"
        fill="fill-white"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  header: string;
  timer?: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const timer = ref<number>(0);
let interval: any;
const startTimer = () => {
  if (!props.timer) {
    return;
  }
  timer.value = props.timer;
  interval = setInterval(() => {
    timer.value -= 1;
    if (timer.value === 0) {
      clearInterval(interval);
      emit('close');
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>
