// import { ref } from 'vue';
import { createApp } from 'vue';
import ModalContainer from '../components/Modal/Container.vue';
import ModalProxy from './ModalInstance';
import { IModal, IModalContainer, IModalProxy } from './types';
export const createModalsContainer = (): IModalContainer | any => {
  if (!process.client) return;
  const modalContainer = document.getElementById('modal');

  if (modalContainer) modalContainer.remove();

  const modalEl = document.createElement('div');
  modalEl.setAttribute('id', 'modal');

  document.body.prepend(modalEl);

  const modalsContainer = modalEl;
  const modals = createApp(ModalContainer);
  const component = modals.mount(modalsContainer);

  return component;
};

export default function useModal(modal: IModal): IModalProxy {
  const config = useRuntimeConfig();
  if (!config.ModalContainer) {
    const component = createModalsContainer();
    config.ModalContainer = component;
  }

  const currentModal = new ModalProxy(modal, config.ModalContainer);

  return currentModal;
}
