import { FormSchema } from '/@/components/Form';
import { checkMinePasswordApi } from '/@/api/cloud/user';

export const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: '当前密码',
    component: 'InputPassword',
    helpMessage: ['输入原密码'],
    rules: [
      {
        required: true,
        message: '请输入原密码',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            checkMinePasswordApi(value)
              .then((res) => {
                if (!res) {
                  return reject('原密码错误');
                } else {
                  return resolve();
                }
              })
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'passwordNew',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
