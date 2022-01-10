import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '被拦截请求IP',
    dataIndex: 'rateLimitLogIp',
    width: 40,
    align: 'left',
  },
  {
    title: '被拦截请求URI',
    dataIndex: 'requestUri',
    width: 80,
    align: 'left',
  },
  {
    title: '被拦截请求方法',
    dataIndex: 'requestMethod',
    width: 30,
    align: 'left',
  },
  {
    title: '拦截时间',
    dataIndex: 'createTime',
    width: 60,
    align: 'left',
  },
  {
    title: 'IP对应地址',
    dataIndex: 'location',
    width: 80,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'rateLimitLogIp',
    label: '被拦截请求IP',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'requestUri',
    label: '被拦截请求URI',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'requestMethod',
    label: '被拦截请求方法',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'GET',
          value: 'GET',
          key: '1',
        },
        {
          label: 'POST',
          value: 'POST',
          key: '2',
        },
        {
          label: 'PUT',
          value: 'PUT',
          key: '3',
        },
        {
          label: 'DELETE',
          value: 'DELETE',
          key: '4',
        },
      ],
    },
    colProps: { span: 6 },
  },
  {
    field: 'createTime',
    label: '拦截时间',
    component: 'RangePicker',
    componentProps: { style: { width: '100%' }, valueFormat: 'YYYY-MM-DD' },
    colProps: { span: 8 },
  },
];
