import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDatasource } from '/@/api/cloud/gen/gen/gen';

export const columns: BasicColumn[] = [
  {
    title: '表名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '库名',
    dataIndex: 'datasource',
  },
  {
    title: '数据量（行）',
    dataIndex: 'dataRows',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '表名',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '库名',
    field: 'datasource',
    component: 'ApiSelect',
    componentProps: {
      api: getDatasource,
      labelField: 'value',
      valueField: 'value',
    },
    required: true,
    colProps: { span: 8 },
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '表名',
    component: 'Input',
    required: true,
    dynamicDisabled: true,
  },
  {
    field: 'datasource',
    label: '库名',
    component: 'Input',
    required: true,
    dynamicDisabled: true,
  },
  {
    label: '对象名',
    field: 'objectName',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
];
