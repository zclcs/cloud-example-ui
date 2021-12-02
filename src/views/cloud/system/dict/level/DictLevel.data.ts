import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getTableLevelList } from '/@/api/cloud/tableLevel';

export const columns: BasicColumn[] = [
  {
    title: '字典code',
    dataIndex: 'code',
    width: 80,
    align: 'left',
  },
  {
    title: '字典值',
    dataIndex: 'title',
    width: 180,
  },
  {
    dataIndex: 'dictName',
    title: '字典表名',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '字典值',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '字典code',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '顶级字典',
    field: 'parentId',
    component: 'ApiSelect',
    componentProps: {
      api: getTableLevelList,
      params: { parentId: 0 },
      labelField: 'title',
      valueField: 'id',
    },
    required: true,
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'code',
    label: '字典code',
    component: 'Input',
    required: true,
  },
  {
    field: 'title',
    label: '字典值',
    component: 'Input',
    required: true,
  },
  {
    field: 'hasPar',
    label: '是否顶级字典',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '是', value: false },
          { label: '否', value: true },
        ],
        onChange(e: any) {
          if (e) {
            formModel.parentId = undefined;
          }
        },
      };
    },
    required: true,
  },
  {
    field: 'parentId',
    label: '上级字典',
    component: 'TreeSelect',
    componentProps: {
      // api: getTableLevelList,
      search: true,
      replaceFields: {
        // params: { dictNameId: formModel.dictNameId },
        title: 'label',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => values.hasPar,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
];
