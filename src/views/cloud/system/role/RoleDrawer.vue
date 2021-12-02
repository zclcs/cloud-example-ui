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
          ref="treeRef"
          :toolbar="false"
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, nextTick } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { getMenuList } from '/@/api/cloud/system';
  import { createRoleApi, updateRoleApi } from '/@/api/cloud/role';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(false);
      const rowId = ref('');
      const treeData = ref<TreeItem[]>([]);
      const treeRef = ref();
      const menuIds = ref();

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      const [registerForm, { resetFields, setFieldsValue, validate, clearValidate }] = useForm({
        labelWidth: 90,
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
        if (unref(isUpdate)) {
          rowId.value = data.record.roleId;
          data.record.menuIds = updateChecked(data.record.menuIds);
          setFieldsValue({
            ...data.record,
          });
        }
        clearValidate();
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          values.menuIds = menuIds.value;
          if (unref(isUpdate)) {
            values.roleId = rowId.value;
            await updateRoleApi(values);
          } else {
            await createRoleApi(values);
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
        treeRef,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        checkMenu,
      };
    },
  });
</script>
