<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button v-if="hasPermission('user:add')" type="primary" @click="handleCreate">
          新增账号
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleView.bind(null, record),
              ifShow: hasPermission('user:detail:view') && hasPermission('log:view'),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission('user:update'),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission('user:delete'),
            },
            {
              icon: 'ant-design:redo-outlined',
              color: 'warning',
              tooltip: '重置密码',
              popConfirm: {
                title: '是否确认重置密码',
                confirm: handleResetPassword.bind(null, record),
              },
              ifShow: hasPermission('user:reset'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteUserApi, resetUserPasswordApi } from '/@/api/cloud/user';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { getUserPage } from '/@/api/cloud/system';
  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, DeptTree, AccountModal, TableAction },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getUserPage,
        rowKey: 'userId',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          ifShow:
            (hasPermission('user:detail:view') && hasPermission('log:view')) ||
            hasPermission('user:update') ||
            hasPermission('user:delete') ||
            hasPermission('user:reset'),
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteUserApi(record.userId);
        searchInfo.deptId = '';
        reload();
      }

      async function handleResetPassword(record: Recordable) {
        await resetUserPasswordApi(record.username);
        searchInfo.deptId = '';
        reload();
      }

      function handleSuccess() {
        searchInfo.deptId = '';
        reload();
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/accountDetail/' + record.username);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleResetPassword,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
        hasPermission,
      };
    },
  });
</script>
