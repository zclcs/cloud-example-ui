import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDict } from '/@/api/cloud/dictCache';
import moment from 'moment';

export const columns: BasicColumn[] = [
  {
    title: '黑名单IP',
    dataIndex: 'blackIp',
    width: 100,
    align: 'left',
  },
  {
    title: '请求URI',
    dataIndex: 'requestUri',
    width: 100,
    align: 'left',
  },
  {
    title: '请求方法',
    dataIndex: 'requestMethod',
    width: 60,
    align: 'left',
  },
  {
    title: '限制时间起',
    dataIndex: 'limitFrom',
    width: 60,
    align: 'left',
  },
  {
    title: '限制时间止',
    dataIndex: 'limitTo',
    width: 60,
    align: 'left',
  },
  {
    title: '黑名单状态',
    dataIndex: 'blackStatusText',
    width: 40,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 80,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'blackIp',
    label: '黑名单IP',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'requestUri',
    label: '请求URI',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'blackStatus',
    label: '黑名单状态',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'enable_disable' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    defaultValue: '1',
    colProps: { span: 6 },
  },
  {
    field: 'requestMethod',
    label: '请求方法',
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
        {
          label: 'ALL',
          value: 'ALL',
          key: '5',
        },
      ],
    },
    colProps: { span: 6 },
  },
];

//const enable = (type: string) => type === '1';

export const formSchema: FormSchema[] = [
  {
    field: 'blackIp',
    label: '黑名单IP',
    component: 'Input',
    helpMessage: ['匹配所有ip则不填'],
  },
  {
    field: 'requestUri',
    label: '请求URI',
    component: 'Input',
    helpMessage: ['支持通配符'],
    required: true,
  },
  {
    field: 'requestMethod',
    label: '请求方法',
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
        {
          label: 'ALL',
          value: 'ALL',
          key: '5',
        },
      ],
    },
    helpMessage: ['如果为ALL则表示对所有方法生效'],
    required: true,
  },
  {
    field: 'blackStatus',
    label: '黑名单状态',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'enable_disable' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    defaultValue: '1',
  },
  // {
  //   field: 'type',
  //   label: '时间限制',
  //   component: 'ApiSelect',
  //   defaultValue: '0',
  //   componentProps: () => {
  //     return {
  //       api: getDict,
  //       params: { dict: 'enable_disable' },
  //       resultField: 'children',
  //       labelField: 'title',
  //       valueField: 'value',
  //     };
  //   },
  // },
  {
    field: 'limitFrom',
    label: '限制时间起',
    component: 'TimePicker',
    componentProps: { style: { width: '100%' }, valueFormat: 'HH:mm:ss' },
    defaultValue: moment('00:00:00', 'HH:mm:ss'),
    //required: true,
    //ifShow: ({ values }) => enable(values.type),
  },
  {
    field: 'limitTo',
    label: '限制时间止',
    component: 'TimePicker',
    componentProps: { style: { width: '100%' }, valueFormat: 'HH:mm:ss' },
    defaultValue: moment('23:59:59', 'HH:mm:ss'),
    //required: true,
    //ifShow: ({ values }) => enable(values.type),
  },
];
