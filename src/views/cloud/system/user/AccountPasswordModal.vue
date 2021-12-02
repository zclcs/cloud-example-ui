<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountPasswordFormSchema } from './account.data';
  import { userPasswordApi } from '/@/api/cloud/user';

  export default defineComponent({
    name: 'AccountPasswordModal',
    components: { BasicModal, BasicForm },
    emits: ['success'],
    setup(_, { emit }) {
      const usernameRef = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountPasswordFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (username) => {
        resetFields();
        setModalProps({ confirmLoading: false });

        usernameRef.value = username;
        setFieldsValue({ username: username });
      });

      const getTitle = computed(() => '修改密码');

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          await userPasswordApi(usernameRef.value, values.newPassword);
          closeModal();
          emit('success', usernameRef.value);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
