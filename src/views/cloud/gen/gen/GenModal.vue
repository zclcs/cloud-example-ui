<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './gen.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { gen } from '/@/api/cloud/gen/gen/gen';

  export default defineComponent({
    name: 'GenModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const { notification } = useMessage();

      const getTitle = computed(() => (!unref(isUpdate) ? '' : '生成代码'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await gen(values)
              .then((r: BlobPart) => {
                const blob = new Blob([r]);
                if ('download' in document.createElement('a')) {
                  const elink = document.createElement('a');
                  elink.download = values.name + '.zip';
                  elink.style.display = 'none';
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href);
                  document.body.removeChild(elink);
                } else {
                  let navigator: any = window.navigator;
                  navigator.msSaveBlob(blob, values.name);
                }
              })
              .catch((r) => {
                console.error(r);
                notification.error({
                  message: '下载失败',
                  duration: 3,
                });
              });
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
