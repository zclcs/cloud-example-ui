<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:download-outlined',
              onClick: handleDownload.bind(null, record),
              ifShow: hasPermission('gen:generate:gen'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <GenModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTables } from '/@/api/cloud/gen/gen/gen';

  import { useModal } from '/@/components/Modal';
  import GenModal from './GenModal.vue';

  import { columns, searchFormSchema } from './gen.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'Gen',
    components: { BasicTable, GenModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();
      const [registerTable] = useTable({
        title: '表',
        api: getTables,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
          ifShow: hasPermission('gen:generate:gen'),
        },
      });

      function handleSuccess() {
        // reload();
      }

      function handleDownload(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      return {
        registerTable,
        handleDownload,
        hasPermission,
        registerModal,
        handleSuccess,
      };
    },
  });
</script>
