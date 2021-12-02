import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDict } from '/@/api/cloud/dictCache';

export const columns: BasicColumn[] = [
  {
    title: '字典表名',
    dataIndex: 'dictName',
    width: 160,
    align: 'left',
  },
  {
    title: '字典表名中文',
    dataIndex: 'dictTitle',
    width: 160,
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'typeText',
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 160,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典表名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'type',
    label: '类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'dict_type' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典表名',
    component: 'Input',
    required: true,
  },
  {
    field: 'dictTitle',
    label: '字典表名中文',
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: '类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'dict_type' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
];
