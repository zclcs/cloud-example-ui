<template>
  <PageWrapper
    :title="`用户` + username + `的资料`"
    content="这是用户资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger @click="handleUpdateUserStatus"> 禁用账号 </a-button>
      <a-button type="primary" @click="handleUpdatePassword"> 修改密码 </a-button>
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用户资料" />
        <a-tab-pane key="logs" tab="操作日志" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <div v-for="i in 10" :key="i">这是用户{{ username }}资料Tab</div>
      </template>
      <template v-if="currentKey == 'logs'">
        <BasicTable @register="registerTable" />
      </template>
    </div>
    <AccountPasswordModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getUserLogPage } from '/@/api/cloud/system';
  import { userStatusApi } from '/@/api/cloud/user';
  import { useModal } from '/@/components/Modal';
  import AccountPasswordModal from './AccountPasswordModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './log.data';

  export default defineComponent({
    name: 'AccountDetail',
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      BasicTable,
      AccountPasswordModal,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const { notification } = useMessage();
      // 此处可以得到用户ID
      const username = ref(route.params?.username);
      const currentKey = ref('detail');
      const [registerTable] = useTable({
        title: '用户' + username.value + '操作日志',
        api: getUserLogPage,
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
        beforeFetch(info) {
          info.username = username.value;
        },
        handleSearchInfoFn(info) {
          if (info.createTime) {
            const createTime = info.createTime;
            info.createTime = undefined;
            info.createTimeFrom = createTime[0];
            info.createTimeTo = createTime[1];
          }
          return info;
        },
      });
      const { setTitle } = useTabs();
      // TODO
      // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

      // 设置Tab的标题（不会影响页面标题）
      setTitle('详情：用户' + username.value);

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/user');
      }

      function handleUpdatePassword() {
        openModal(true, username.value);
      }

      async function handleUpdateUserStatus() {
        await userStatusApi(username.value);
        notification.success({
          message: '禁用账号成功',
          duration: 3,
        });
      }

      function handleSuccess(username) {
        notification.success({
          message: '密码修改成功',
          description: '请告知' + username + '用户',
          duration: 3,
        });
      }
      return {
        registerTable,
        registerModal,
        goBack,
        handleUpdateUserStatus,
        handleUpdatePassword,
        handleSuccess,
        username,
        currentKey,
      };
    },
  });
</script>

<style></style>
