import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDict } from '/@/api/cloud/dictCache';
import { getTableLevelLazyOption } from '/@/api/cloud/tableLevel';

export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'companyName',
    width: 40,
    align: 'left',
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'companyCode',
    width: 80,
    align: 'left',
  },
  {
    title: '企业注册地区',
    dataIndex: 'areaCodeText',
    width: 80,
  },
  {
    title: '法定代表人',
    dataIndex: 'legalMan',
    width: 80,
    align: 'left',
  },
  {
    title: '联系人',
    dataIndex: 'linkMan',
    width: 80,
    align: 'left',
  },
  {
    title: '联系人电话',
    dataIndex: 'linkPhone',
    width: 80,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'companyCode',
    label: '统一社会信用代码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'companyName',
    label: '企业名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'areaCode',
    component: 'ApiCascader',
    label: '企业注册地区',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getTableLevelLazyOption,
      dataField: 'data',
      labelField: 'title',
      valueField: 'code',
      changeSelect: true,
      initFetchParams: { parentCode: '0' },
      asyncFetchParamKey: 'parentCode',
      isLeaf: (record) => {
        return !record.hasChildren;
      },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'companyName',
    label: '企业名称',
    component: 'Input',
    colProps: {
      span: 8,
    },
    required: true,
  },
  {
    field: 'capitalCurrencyType',
    label: '资本币种',
    component: 'ApiSelect',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getDict,
      params: { dict: 'currency_type' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
  },
  {
    field: 'legalManIdCardType',
    label: '法定代表人证件类型',
    component: 'ApiSelect',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getDict,
      params: { dict: 'id_card_type' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
  },
  {
    field: 'companyCode',
    label: '统一社会信用代码',
    component: 'Input',
    colProps: {
      span: 8,
    },
    required: true,
  },
  {
    field: 'factRegCapital',
    label: '实收资本（万元）',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'legalManIdCardNumber',
    label: '法定代表人证件号码',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'areaCode',
    label: '企业注册地区',
    component: 'ApiCascader',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getTableLevelLazyOption,
      dataField: 'data',
      labelField: 'title',
      valueField: 'code',
      initFetchParams: { parentCode: '0' },
      asyncFetchParamKey: 'parentCode',
      isLeaf: (record) => {
        return !record.hasChildren;
      },
    },
    required: true,
  },
  {
    field: 'officePhone',
    label: '办公电话',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'legalManDuty',
    label: '法定代表人职务',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'address',
    label: '企业营业地址',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'faxNumber',
    label: '传真号码',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'legalManProTitle',
    label: '法定代表人职称',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'registerDate',
    label: '注册日期',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 8,
    },
    required: true,
  },
  {
    field: 'email',
    label: '企业邮箱',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'linkMan',
    label: '联系人姓名',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'establishDate',
    label: '成立日期',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'licenseNum',
    label: '工商营业执照注册号',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'linkPhone',
    label: '联系人电话',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'regCapital',
    label: '注册资本（万元）',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'zipCode',
    label: '邮政编码',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'webSite',
    label: '企业网址',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'companyType',
    label: '企业登记注册类型',
    component: 'ApiSelect',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getDict,
      params: { dict: 'company_type' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
  },
  {
    field: 'legalMan',
    label: '法定代表人姓名',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'remark',
    label: '企业备注',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
];
