<template>
  <div class="relative flex flex-wrap justify-center gap-4 p-2">
    <button
      class="rounded-md bg-zinc-900 p-2 text-lg text-white transition-all hover:bg-zinc-700"
      @click.stop="btn"
    >
      Standart Confirm With Custom Component and use Default Buttons
    </button>
    <button
      class="rounded-md bg-zinc-900 p-2 text-lg text-white transition-all hover:bg-zinc-700"
      @click.stop="btn5"
    >
      Standart Confirm With Custom Component and use Custom Buttons
    </button>
    <button
      class="rounded-md bg-zinc-900 p-2 text-lg text-white transition-all hover:bg-zinc-700"
      @click="btn1"
    >
      Standart Confirm Modal
    </button>
    <button
      class="rounded-md bg-zinc-900 p-2 text-lg text-white transition-all hover:bg-zinc-700"
      @click="btn2"
    >
      Error Modal
    </button>
    <button
      class="rounded-md bg-zinc-900 p-2 text-lg text-white transition-all hover:bg-zinc-700"
      @click="btn3"
    >
      Standart Notification Modal
    </button>
  </div>
</template>

<script setup lang="ts">
import useModal from '../hook/modal';
import Email from '~/components/Email.vue';
import EmailTest from '~/components/EmailTest.vue';

const label = ref('Email');
const modal = useModal({
  header: 'Email',
  component: Email,
  type: 'confirm',
  button: {
    text: 'Далее',
    type: 'confirm',
  },
  fields: true, // Для получения полей объявленный в кастомном компоененте после нажатия кнокпи Далее await modal.confirm()
});

const modal5 = useModal({
  header: 'Email',
  component: EmailTest,
  prop: {
    label,
  },
  type: 'success',
  fields: true, // Для получения полей объявленный в кастомном компоененте после нажатия кнокпи Далее await modal.confirm()
});

const modal1 = useModal({
  header: 'Подтверждение',
  headerDescription: 'Подтвердите согласие',
  description: 'Вы уверены?',
  type: 'confirm',
  fields: true,
});

const modal2 = useModal({
  header: 'Временная блокировка',
  headerDescription: 'Ваш аккаунт заблокирован!',
  description: 'Доступ к приложению временно ограничен по следуюущим причинам',
  type: 'error',
  button: {
    text: 'Ознакомлен',
    type: 'confirm',
  },
  fields: true,
});

const modal3 = useModal({
  header: 'Временная блокировка',
  description: 'Вы вошли в игру на другом устройстве или в другом окне',
  type: 'notification',
});
const btn = async () => {
  modal.show();
  const confirm = await modal.confirm();
  console.log({ confirm: confirm.email.value });
};
const btn1 = async () => {
  modal1.show();
  const confirm = await modal.confirm();
  console.log({ confirm });
};
const btn2 = async () => {
  modal2.show();
  const confirm = await modal.confirm();
  console.log({ confirm });
};
const btn3 = () => {
  modal3.show();
};
const btn5 = () => {
  modal5.show();
};
</script>
