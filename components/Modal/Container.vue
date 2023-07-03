<template>
  <div id="modalContainer">
    <Transition name="fadeModal">
      <div
        v-if="modals.length"
        class="fixed bottom-0 left-0 right-0 top-0 z-50 flex w-full items-center justify-center bg-zinc-500/80 transition"
      >
        <ModalWrapper
          v-for="(modal, index) in filteredModals"
          :id="modal.id"
          :key="index"
          :index="index"
          :header="modal.header"
          :description="modal.description"
          :visible="modal?.visible"
          :component="modal.component"
          :timer="modal.timer"
          :type="modal.type"
          :button="modal.button"
          :prop="modal.prop"
          :header-description="modal.headerDescription"
          :fields="modal.fields"
          @close="(id:string) => close(id)"
          @confirm="(value: any) => resolve(value)"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { IModal } from '~/hook/types';

interface IModalObj extends IModal {
  id: string;
  visible: boolean;
}
const modals = ref<IModalObj[]>([]);
const resolvePromise = ref<Function | null>(null);

const addModal = (
  {
    header,
    description,
    component,
    button,
    type = 'success',
    headerDescription,
    fields,
    prop,
    timer,
  }: IModal,
  id: string,
) => {
  modals.value.push({
    id,
    header,
    description,
    visible: true,
    button,
    prop,
    type,
    timer,
    headerDescription,
    fields,
    component: component ? markRaw(component) : undefined,
  });
};

const filteredModals = computed(() => {
  const lastIndex = modals.value.length - 1;
  modals.value.forEach((item, index) => {
    index !== lastIndex ? (item.visible = false) : (item.visible = true);
  });
  return modals.value;
});
const close = (id: string) => {
  modals.value = modals.value.filter((item) => item.id !== id);
};

const confirm = () => {
  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
};

const resolve = (value: boolean | unknown) => {
  if (typeof resolvePromise.value === 'function') resolvePromise.value(value);
};

defineExpose({
  addModal,
  close,
  confirm,
});
</script>
<style scoped>
.fadeModal-enter-from {
  opacity: 0;
}

.fadeModal-leave-to {
  opacity: 0;
}

.fadeModal-enter-from .modal-container,
.fadeModal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
