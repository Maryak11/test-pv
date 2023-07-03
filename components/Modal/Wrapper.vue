<template>
  <div
    v-if="visible"
    :id="id"
    class="relative flex w-[90%] flex-col justify-between overflow-hidden rounded-xl border-2 border-[#3364c6] bg-[#000519] sm:w-[70%] md:w-[50%] lg:w-[40%]"
  >
    <section
      class="relative flex items-center justify-center rounded-tl-xl rounded-tr-xl bg-[#01143f] p-2 text-xl font-semibold text-[#589fe7]"
    >
      {{ header }}

      <div
        class="absolute right-2 top-1 cursor-pointer text-white transition-all hover:opacity-50"
        @click.stop="emit('close', id)"
      >
        <Icon
          name="close"
          size="lg"
          fill="fill-white"
        />
      </div>
    </section>

    <section
      v-if="!component"
      class="flex flex-col items-center gap-3 px-10 py-8"
    >
      <div
        v-if="type !== 'notification'"
        class="flex flex-col items-center gap-10"
      >
        <Icon
          name="flag"
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
    </section>
    <section
      v-else
      class="flex flex-col items-center gap-3 px-10 py-8 text-white"
    >
      <component
        :is="component"
        ref="customComponent"
        v-bind="prop"
        class="px-10"
        @close="emit('close', props.id)"
      />
    </section>

    <section
      v-if="type !== 'notification'"
      id="buttons"
      ref="customButtons"
      class="flex w-full justify-center gap-3 bg-[#01143f] px-10 py-3"
    >
      <ModalDefaultButtons
        v-if="type === 'confirm' || button"
        :button="button"
        @resolve="confirmResolve"
        @reject="confirmReject"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { IButton, IComponentProps } from '~/hook/types';

const props = defineProps<{
  id: string;
  index: number;
  header?: string;
  description?: string;
  component?: Component;
  type: string;
  visible: boolean;
  fields?: boolean | object;
  button?: IButton;
  prop: any;
  headerDescription?: string;
}>();

const customComponent = ref<IComponentProps | null>(null);
const customButtons = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  (e: 'close', value: string): void;
  (e: 'confirm', value?: boolean | object): Promise<boolean | any>;
}>();

const clickOutsideModal = () => {
  document.addEventListener(
    'click',

    (event) => {
      eventClick(event);
    },
    true,
  );
};

const eventClick = (e: Event) => {
  const currentModal = document.getElementById(props.id);
  if (currentModal) {
    const isClickInside = currentModal?.contains(e.target as HTMLElement);
    if (!isClickInside) {
      emit('close', props.id);
    }
  }
};

onMounted(() => {
  clickOutsideModal();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', (event) => eventClick(event));
});

const confirmResolve = () => {
  emit('confirm', customComponent.value?.fields || true);
  emit('close', props.id);
};
const confirmReject = () => {
  emit('confirm', false);
  emit('close', props.id);
};

watch(
  () => props.visible,
  (nv) => {
    if (!nv) document.removeEventListener('click', (event) => eventClick(event));
  },
);
</script>
