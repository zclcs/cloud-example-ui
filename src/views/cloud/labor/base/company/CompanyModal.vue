<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './table.data';

  import { createCompanyApi, updateCompanyApi } from '/@/api/cloud/company';
  export default defineComponent({
    name: 'CompanyModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 140,
        schemas: formSchema,
        actionColOptions: {
          span: 24,
        },
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.companyId;
          let areaCode = data.record.areaCode;
          let areaCodeText = data.record.areaCodeText;
          let arr: Array<string> = typeof areaCode === 'string' ? areaCode.split(',') : areaCode;
          let arrText: Array<string> =
            typeof areaCodeText === 'string' ? areaCodeText.split('、') : areaCodeText;
          data.record.areaCode = arr;
          await updateSchema({
            field: 'areaCode',
            componentProps: {
              displayRenderArray: arrText,
            },
          });
          setFieldsValue({
            ...data.record,
          });
        } else {
          await updateSchema({
            field: 'areaCode',
            componentProps: {
              displayRenderArray: '',
            },
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增企业' : '编辑企业'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.areaCode = values.areaCode.join();
          if (unref(isUpdate)) {
            values.companyId = rowId.value;
            await updateCompanyApi(values);
          } else {
            await createCompanyApi(values);
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
