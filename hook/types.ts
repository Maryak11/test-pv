import { ComponentPublicInstance, FunctionalComponent } from 'vue';

export interface IButton {
  text?: string;
  type?: string;
  props?: unknown;
}

export interface IModal {
  header: string;
  description?: string;
  component?: Component;
  button?: IButton;
  type: string;
  prop?: any;
  headerDescription?: string;
  fields?: boolean | any;
}

export interface IComponentProps extends FunctionalComponent {
  fields: unknown;
}

export interface IModalContainer extends ComponentPublicInstance {
  addModal(modal: IModal, id: string): void;
  close(id: string): void;
  confirm(): Promise<any>;
}

export interface IModalProxy {
  id: string;
  modal: IModal;
  container: IModalContainer;

  show(): void;
  close(): void;
  confirm(): Promise<boolean | any>;
}
