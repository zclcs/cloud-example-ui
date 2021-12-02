import { FormSchema } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '主键',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    field: 'author',
    label: '作者',
    component: 'Input',
    required: true,
  },
  {
    field: 'basePackage',
    label: '基础包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'entityPackage',
    label: 'entity包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'aoPackage',
    label: '入参包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'voPackage',
    label: '出参包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'mapperPackage',
    label: 'mapper包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'mapperXmlPackage',
    label: 'mapper xml包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'servicePackage',
    label: 'service包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'serviceImplPackage',
    label: 'serviceImpl包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'controllerPackage',
    label: 'controller包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'isTrim',
    label: '是否去除前缀',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: ({ formActionType, formModel }) => {
      return {
        options: [
          { label: '否', value: '0' },
          { label: '是', value: '1' },
        ],
        onChange: async () => {
          const { updateSchema } = formActionType;
          if (formModel.isTrim === '1') {
            updateSchema({
              field: 'trimValue',
              required: true,
            });
          } else {
            updateSchema({
              field: 'trimValue',
              required: false,
            });
          }
        },
      };
    },
  },
  {
    field: 'trimValue',
    label: '前缀内容',
    component: 'Input',
  },
];
