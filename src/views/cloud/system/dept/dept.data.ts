import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDeptTree } from '/@/api/cloud/system';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'label',
    width: 160,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 80,
  //   customRender: ({ record }) => {
  //     const status = record.status;
  //     const enable = ~~status === 0;
  //     const color = enable ? 'green' : 'red';
  //     const text = enable ? '启用' : '停用';
  //     return h(Tag, { color: color }, () => text);
  //   },
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'label',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'harPar',
    label: '是否顶级部门',
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
    label: '上级部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getDeptTree,
      replaceFields: {
        title: 'label',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => values.harPar,
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   required: true,
  // },
];
