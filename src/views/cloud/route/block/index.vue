<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission('blockLog:delete'),
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBlockLogPage, deleteBlockLogApi } from '/@/api/cloud/blockLog';

  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './table.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'RouteLog',
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '黑名单日志',
        api: getBlockLogPage,
        rowKey: 'blockId',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        beforeFetch(info) {
          if (info.createTime) {
            const createTime = info.createTime;
            info.createTime = undefined;
            info.createTimeFrom = createTime[0];
            info.createTimeTo = createTime[1];
          }
          return info;
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
          ifShow: hasPermission('blockLog:delete'),
        },
      });

      async function handleDelete(record: Recordable) {
        await deleteBlockLogApi(record.routeId);
        reload();
      }

      return {
        registerTable,
        handleDelete,
        hasPermission,
      };
    },
  });
</script>
