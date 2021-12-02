import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典code',
    dataIndex: 'code',
    width: 50,
    align: 'left',
  },
  {
    title: '字典值',
    dataIndex: 'title',
    width: 100,
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
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '字典code',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'title',
    label: '字典值',
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   label: '表名',
  //   field: 'dictNameId',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     api: getTableNameList,
  //     params: { type: 0 },
  //     labelField: 'dictName',
  //     valueField: 'id',
  //   },
  //   required: true,
  //   colProps: { span: 8 },
  // },
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
