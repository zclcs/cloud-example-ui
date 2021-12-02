<template>
  <div class="py-8 bg-white flex flex-col justify-center items-center">
    <BasicForm @register="register" />
    <div class="flex justify-center">
      <a-button @click="resetFields"> 重置 </a-button>
      <a-button class="!ml-4" type="primary" @click="handleSubmit" v-if="hasPermission('role:add')">
        确认
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { getConfig, updateConfigApi } from '/@/api/cloud/gen/config/config';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { formSchema } from './config.data';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'GenConfig',
    components: { BasicForm },
    setup() {
      const { hasPermission } = usePermission();
      const [register, { validate, setFieldsValue, resetFields }] = useForm({
        size: 'large',
        labelWidth: 150,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      const { notification } = useMessage();

      (async () => {
        const data = await getConfig();

        setFieldsValue({
          ...data,
        });
      })();

      async function handleSubmit() {
        try {
          const values = await validate();
          await updateConfigApi(values);
          notification.success({
            message: '修改配置成功',
            duration: 3,
          });
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit, hasPermission };
    },
  });
</script>
