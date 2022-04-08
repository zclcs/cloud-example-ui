<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './DictLevel.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import {
    createTableLevelApi,
    updateTableLevelApi,
    getTableLevelOption,
  } from '/@/api/cloud/tableLevel';

  export default defineComponent({
    name: 'DictLevelDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const dictName = ref('');

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        dictName.value = data.dictName;

        setFieldsValue({ dictName: dictName.value });
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getTableLevelOption({ dictName: dictName.value });
        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增层级字典' : '编辑层级字典'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          values.dictName = dictName.value;
          if (unref(isUpdate)) {
            values.id = rowId.value;
            await updateTableLevelApi(values);
          } else {
            await createTableLevelApi(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
