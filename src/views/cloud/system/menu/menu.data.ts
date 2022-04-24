import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { getMenuList } from '/@/api/cloud/system';
import { getDict } from '/@/api/cloud/dictCache';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'label',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: 180,
  },
  {
    title: '菜单类型',
    dataIndex: 'typeText',
    width: 80,
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

const text = (type: string) => (type === '2' ? '目录' : type === '0' ? '菜单' : '按钮');
const isMenu = (type: string) => type === '0';
const isButton = (type: string) => type === '1';
const isDir = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
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
    field: 'type',
    label: '菜单类型',
    component: 'ApiSelect',
    defaultValue: '0',
    componentProps: ({ formActionType }) => {
      return {
        api: getDict,
        params: { dict: 'menu_type' },
        resultField: 'children',
        labelField: 'title',
        valueField: 'value',
        onChange: async (s: string) => {
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'label',
            label: text(s) + '名称',
          });
        },
      };
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'label',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'keepAliveName',
    label: '页面缓存名称',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getMenuList,
      replaceFields: {
        title: 'label',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'redirect',
    label: '重定向的子菜单',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    required: ({ values }) => isButton(values.type),
    ifShow: ({ values }) => !isDir(values.type),
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '禁用', value: '1' },
  //     ],
  //   },
  // },
  // {
  //   field: 'isExt',
  //   label: '是否外链',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '否', value: '0' },
  //       { label: '是', value: '1' },
  //     ],
  //   },
  //   ifShow: ({ values }) => !isButton(values.type),
  // },
  {
    field: 'ignoreKeepAlive',
    label: '是否忽略缓存',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'yes_no' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'hideMenu',
    label: '是否隐藏菜单',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'yes_no' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'hideBreadcrumb',
    label: '是否隐藏面包屑显示',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'yes_no' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'hideChildrenInMenu',
    label: '是否隐藏所有子菜单',
    defaultValue: '0',
    component: 'ApiSelect',
    componentProps: {
      api: getDict,
      params: { dict: 'yes_no' },
      resultField: 'children',
      labelField: 'title',
      valueField: 'value',
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'currentActiveMenu',
    label: '当前激活的菜单',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
];
