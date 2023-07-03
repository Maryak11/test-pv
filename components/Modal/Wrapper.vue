<template>
  <div
    v-if="visible"
    :id="id"
    class="modal-container relative flex w-[90%] flex-col justify-between overflow-hidden rounded-xl border-2 border-[#3364c6] bg-[#000519] transition-all sm:w-[70%] md:w-[50%] lg:w-[40%]"
  >
    <ModalHeader
      v-if="header"
      :header="header"
      :timer="timer"
      @close="emit('close', id)"
    />

    <section class="flex flex-col items-center gap-3 px-10 py-8">
      <ModalBody
        v-if="!component"
        :type="type"
        :icon="icon"
        :header-description="headerDescription"
        :description="description"
      />
      <component
        :is="component"
        v-else
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
  timer?: number;
  icon?: string;
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

const addCustomButtons = () => {
  const customBtn = document.getElementById('customButtons');
  if (customBtn) {
    Array.from(customBtn?.childNodes).forEach((item) => {
      customButtons.value?.appendChild(item);
    });
    customBtn?.remove();
  }
};

onMounted(() => {
  clickOutsideModal();
  addCustomButtons(); // метод для добавления в футер кастомных кнопок (пробовал сделать через телепорт, но тогда не работает нормально анимация, в итоге пришел к такому костылю), главное в компоненте который прокидаваешь обретке кнопок задать id="customButtons"
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

<style></style>
