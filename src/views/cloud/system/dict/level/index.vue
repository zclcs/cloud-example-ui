<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <TableTree class="w-1/4 xl:w-1/5" :type="'1'" @select="handleSelect" />
    <BasicTable
      @register="registerTable"
      class="w-3/4 xl:w-4/5"
      :searchInfo="searchInfo"
      @fetch-success="onFetchSuccess"
    >
      <template #toolbar>
        <a-button v-if="hasPermission('tableLevel:add')" type="primary" @click="handleCreate">
          新增层级字典
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission('tableLevel:update'),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission('tableLevel:delete'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <DictLevelDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, nextTick, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTableLevelTree, deleteTableLevelApi } from '/@/api/cloud/tableLevel';

  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import TableTree from '../table/TableTree.vue';
  import { useDrawer } from '/@/components/Drawer';
  import DictLevelDrawer from './DictLevelDrawer.vue';

  import { columns, searchFormSchema } from './DictLevel.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'DictLevelTable',
    components: { BasicTable, DictLevelDrawer, TableAction, PageWrapper, TableTree },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const searchInfo = reactive<Recordable>({});
      const { hasPermission } = usePermission();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '层级字典列表',
        api: getTableLevelTree,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
          ifShow: hasPermission('tableLevel:update') || hasPermission('tableLevel:delete'),
        },
      });

      function handleCreate() {
        const isSelect = handleDataChange();
        if (isSelect) {
          openDrawer(true, {
            isUpdate: false,
            dictName: searchInfo.dictName,
          });
        }
      }

      function handleEdit(record: Recordable) {
        const isSelect = handleDataChange();
        if (isSelect) {
          openDrawer(true, {
            record,
            isUpdate: true,
            dictName: searchInfo.dictName,
          });
        }
      }

      async function handleDelete(record: Recordable) {
        await deleteTableLevelApi(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      function handleSelect(dictName = '') {
        searchInfo.dictName = dictName;
        reload();
      }

      function handleDataChange() {
        if (searchInfo.dictName === '' || searchInfo.dictName === undefined) {
          notification.success({
            message: '请在左侧选择字典表名后操作',
            duration: 3,
          });
          return false;
        }
        return true;
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        hasPermission,
        searchInfo,
        handleSelect,
      };
    },
  });
</script>
