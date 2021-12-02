import { defHttpWithTransform } from '/@/utils/http/axios';
import { UserInfoModel } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  USER = '/system/user',
  RESETPASSWORD = '/system/user/password/reset',
  CHECKPASSWORD = '/system/user/password',
  CHECKMINEPASSWORD = '/system/user/password/mine/check',
  PASSWORD = '/system/user/password',
  PASSWORDMINE = '/system/user/password/mine',
  STATUS = '/system/user/status',
}

// Get personal center-basic settings

export const accountInfoApi = () =>
  defHttpWithTransform.get<UserInfoModel>({ url: Api.ACCOUNT_INFO });

export const sessionTimeoutApi = () =>
  defHttpWithTransform.post<void>({ url: Api.SESSION_TIMEOUT });

export const createUserApi = (params: UserInfoModel) =>
  defHttpWithTransform.post<void>({
    url: Api.USER,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateUserApi = (params: UserInfoModel) =>
  defHttpWithTransform.put<void>({
    url: Api.USER,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const resetUserPasswordApi = (username: String) =>
  defHttpWithTransform.put<void>({
    url: Api.RESETPASSWORD,
    params: {
      usernames: username,
    },
  });

export const checkUserPasswordApi = (username: String, password: String) =>
  defHttpWithTransform.get(
    {
      url: Api.CHECKPASSWORD + '/' + username + '/check' + '/' + password,
    },
    { errorMessageMode: 'none' }
  );

export const checkMinePasswordApi = (password: String) =>
  defHttpWithTransform.get(
    {
      url: Api.CHECKMINEPASSWORD + '/' + password,
    },
    { errorMessageMode: 'none' }
  );

export const userPasswordApi = (username: String, password: String) =>
  defHttpWithTransform.put<void>({
    url: Api.PASSWORD,
    params: {
      username,
      password,
    },
  });

export const minePasswordApi = (password: String) =>
  defHttpWithTransform.put<void>({
    url: Api.PASSWORDMINE,
    params: {
      password,
    },
  });

export const userStatusApi = (username: String) =>
  defHttpWithTransform.put<void>({
    url: Api.STATUS,
    params: {
      username,
    },
  });

export const deleteUserApi = (userIds: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.USER + '/' + userIds,
  });
