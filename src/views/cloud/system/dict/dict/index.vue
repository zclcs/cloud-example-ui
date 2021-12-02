<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <TableTree class="w-1/4 xl:w-1/5" :type="'0'" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button v-if="hasPermission('table:add')" type="primary" @click="handleCreate">
          新增字典
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission('table:update'),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission('table:delete'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <DictModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTablePage } from '/@/api/cloud/table';
  import { PageWrapper } from '/@/components/Page';
  import { deleteTableApi } from '/@/api/cloud/table';

  import { useMessage } from '/@/hooks/web/useMessage';
  import TableTree from '../table/TableTree.vue';
  import { useModal } from '/@/components/Modal';
  import DictModal from './DictModal.vue';

  import { columns, searchFormSchema } from './dict.data';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'DictTable',
    components: { BasicTable, DictModal, TableAction, PageWrapper, TableTree },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const { notification } = useMessage();
      const searchInfo = reactive<Recordable>({});
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '字典列表',
        api: getTablePage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
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
          ifShow: hasPermission('table:update') || hasPermission('table:delete'),
        },
      });

      function handleCreate() {
        const isSelect = handleDataChange();
        if (isSelect) {
          openModal(true, {
            isUpdate: false,
            dictNameId: searchInfo.dictNameId,
          });
        }
      }

      function handleEdit(record: Recordable) {
        const isSelect = handleDataChange();
        if (isSelect) {
          openModal(true, {
            record,
            isUpdate: true,
            dictNameId: searchInfo.dictNameId,
          });
        }
      }

      async function handleDelete(record: Recordable) {
        await deleteTableApi(record.id);
        reload();
      }

      function handleSelect(dictNameId = '') {
        searchInfo.dictNameId = dictNameId;
        reload();
      }

      function handleDataChange() {
        console.log(searchInfo.dictNameId);
        if (searchInfo.dictNameId === '' || searchInfo.dictNameId === undefined) {
          notification.success({
            message: '请在左侧选择字典表名后操作',
            duration: 3,
          });
          return false;
        }
        return true;
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        hasPermission,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
