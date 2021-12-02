<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      title="字典表名"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'dictName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getTableNameList } from '/@/api/cloud/tableName';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'TableTree',
    components: { BasicTree },
    props: {
      type: propTypes.string.def('type'),
    },
    emits: ['select'],
    setup(props, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await getTableNameList({ type: props.type })) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
