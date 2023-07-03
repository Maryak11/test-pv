<template>
  <div
    v-if="type !== 'notification'"
    class="flex flex-col items-center gap-10"
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="xl"
      fill="fill-white"
    />
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center gap-6 text-white">
        <h2
          class="text-center text-xl font-semibold"
          :class="{ 'text-red-600': type === 'error', 'text-green-600': type === 'success' }"
        >
          {{ headerDescription }}
        </h2>
      </div>
    </div>
  </div>
  <p
    class="text-center text-lg font-medium text-blue-100"
    v-html="description"
  ></p>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  type: string;
  headerDescription?: string;
  description?: string;
  icon?: string;
}>();
</script>
