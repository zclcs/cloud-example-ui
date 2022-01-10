import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '客户端ID',
    dataIndex: 'clientId',
    width: 40,
    align: 'left',
  },
  {
    title: '客户端密钥',
    dataIndex: 'clientSecret',
    width: 80,
    align: 'left',
    format: () => '******',
  },
  {
    title: '客户端权限',
    dataIndex: 'scope',
    width: 80,
  },
  {
    title: '鉴权类型',
    dataIndex: 'authorizedGrantTypes',
    width: 80,
    align: 'left',
  },
  {
    title: '访问令牌有效期（秒）',
    dataIndex: 'accessTokenValidity',
    width: 80,
    align: 'left',
  },
  {
    title: '刷新令牌有效期（秒）',
    dataIndex: 'refreshTokenValidity',
    width: 80,
    align: 'left',
  },
  {
    title: '跳转地址',
    dataIndex: 'webServerRedirectUri',
    width: 80,
    align: 'left',
  },
  {
    title: '是否自动批准',
    dataIndex: 'autoApprove',
    width: 80,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'clientId',
    label: '客户端编号',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'clientId',
    label: '客户端ID',
    component: 'Input',
    required: true,
  },
  {
    field: 'clientSecret',
    label: '客户端密钥',
    component: 'Input',
    required: true,
  },
  {
    field: 'scope',
    label: '客户端权限',
    component: 'Input',
    required: true,
  },
  {
    field: 'authorizedGrantTypes',
    label: '鉴权类型',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'authorization_code',
          value: 'authorization_code',
          key: '1',
        },
        {
          label: 'client_credentials',
          value: 'client_credentials',
          key: '2',
        },
        {
          label: 'password',
          value: 'password',
          key: '3',
        },
        {
          label: 'implicit',
          value: 'implicit',
          key: '4',
        },
        {
          label: 'refresh_token',
          value: 'refresh_token',
          key: '5',
        },
      ],
      mode: 'multiple',
    },
    required: true,
  },
  {
    label: '',
    field: 'menuIds',
    slot: 'menu',
    component: 'Input',
  },
  {
    field: 'webServerRedirectUri',
    label: '跳转地址',
    component: 'Input',
  },
  {
    field: 'accessTokenValidity',
    label: '访问令牌有效期（秒）',
    component: 'Input',
    required: true,
  },
  {
    field: 'refreshTokenValidity',
    label: '刷新令牌有效期（秒）',
    component: 'Input',
  },
  {
    field: 'autoApprove',
    label: '自动批准',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'true',
          value: 'true',
          key: '1',
        },
        {
          label: 'false',
          value: 'false',
          key: '2',
        },
      ],
    },
  },
];
