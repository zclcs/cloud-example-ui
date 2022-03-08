<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ title: 'label', key: 'id' }"
          checkable
          :onCheck="checkMenu"
          ref="menuTreeRef"
          :toolbar="false"
          title="权限分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, nextTick } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { formSchema } from './table.data';
  import { getMenuList } from '/@/api/cloud/system';

  import { createClientApi, updateClientApi } from '/@/api/cloud/client';
  export default defineComponent({
    name: 'ClientDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const treeData = ref<TreeItem[]>([]);
      const menuTreeRef = ref();
      const menuIds = ref();

      function getTree() {
        const tree = unref(menuTreeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, clearValidate }] =
        useForm({
          labelWidth: 150,
          schemas: formSchema,
          showActionButtonGroup: false,
        });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getMenuList()) as any as TreeItem[];
          // 展开全部
          nextTick(() => {
            getTree().expandAll(true);
          });
        }
        isUpdate.value = !!data?.isUpdate;
        updateSchema({
          field: 'clientId',
          ifShow: true,
        });
        updateSchema({
          field: 'clientSecret',
          ifShow: true,
        });
        if (unref(isUpdate)) {
          rowId.value = data.record.clientId;
          if (data.record.menuIds) {
            data.record.menuIds = updateChecked(data.record.menuIds);
          }
          let authorizedGrantTypes = data.record.authorizedGrantTypes;
          let arr: Array<string> =
            typeof authorizedGrantTypes === 'string'
              ? authorizedGrantTypes.split(',')
              : authorizedGrantTypes;
          data.record.authorizedGrantTypes = arr;
          setFieldsValue({
            ...data.record,
          });
          updateSchema({
            field: 'clientId',
            ifShow: false,
          });
          updateSchema({
            field: 'clientSecret',
            ifShow: false,
          });
        }
        clearValidate();
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增客户端' : '编辑客户端'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          let authorizedGrantTypes = values.authorizedGrantTypes;
          values.authorizedGrantTypes = authorizedGrantTypes.join();
          values.menuIds = menuIds.value;
          if (unref(isUpdate)) {
            values.clientId = rowId.value;
            await updateClientApi(values);
          } else {
            await createClientApi(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      // 如果勾选节点中存在非叶子节点，tree组件会将其所有子节点全部勾选
      // 所以要找出所有叶子节点，仅勾选叶子节点，tree组件会将父节点同步勾选
      function getAllCheckedLeafNodeId(tree, checkedIds, temp) {
        for (let i = 0; i < tree.length; i++) {
          const item = tree[i];
          if (item.children && item.children.length !== 0) {
            getAllCheckedLeafNodeId(item.children, checkedIds, temp);
          } else {
            if (checkedIds.indexOf(item.id) !== -1) {
              temp.push(item.id);
            }
          }
        }
        return temp;
      }

      function updateChecked(checkedIds) {
        menuIds.value = checkedIds;
        // 找出所有的叶子节点
        checkedIds = getAllCheckedLeafNodeId(treeData.value, checkedIds, []);
        return checkedIds;
      }

      function checkMenu(checkedKeys, e) {
        const { halfCheckedKeys } = e;
        menuIds.value = [...checkedKeys, ...halfCheckedKeys];
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        checkMenu,
        menuTreeRef,
      };
    },
  });
</script>
