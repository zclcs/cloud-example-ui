import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { isRoleExist } from '/@/api/cloud/system';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.status === '1',
  //       checkedChildren: '已启用',
  //       unCheckedChildren: '已禁用',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         record.pendingStatus = true;
  //         const newStatus = checked ? '1' : '0';
  //         const { createMessage } = useMessage();
  //         setRoleStatus(record.id, newStatus)
  //           .then(() => {
  //             record.status = newStatus;
  //             createMessage.success(`已成功修改角色状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改角色状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleId',
    label: '角色编号',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    helpMessage: ['角色名不能重复'],
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              const { roleId } = values;
              if (!roleId) {
                return resolve();
              }
              if (!value) {
                return reject('角色名不能为空');
              }
              isRoleExist(roleId, value)
                .then((res) => {
                  if (res) {
                    return reject('角色名已被使用');
                  } else {
                    return resolve();
                  }
                })
                .catch((error) => {
                  return reject(error.msg || '验证失败');
                });
            });
          },
        },
      ];
    },
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
  // },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: '',
    field: 'menuIds',
    slot: 'menu',
    component: 'Input',
  },
];
