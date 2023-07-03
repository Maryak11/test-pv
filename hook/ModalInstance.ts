import { v4 as uuidv4 } from 'uuid';
import { createModalsContainer } from './modal';
import { IModal, IModalContainer, IModalProxy } from './types';

export default class ModalProxy implements IModalProxy {
  id: string;
  modal: IModal;
  container;
  constructor(modal: IModal, container: IModalContainer) {
    this.modal = modal;
    this.container = container;
    this.id = uuidv4();
  }

  show() {
    if (Object.keys(this.container).length === 0) {
      this.container = createModalsContainer();
    }
    return this.container?.addModal(this.modal, this.id);
  }

  close() {
    return this.container?.close(this.id);
  }

  confirm() {
    const confirm = this.container?.confirm();
    return confirm;
  }
}
