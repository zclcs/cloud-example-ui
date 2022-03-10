import { defHttp, defNoTokenHttp, defHttpWithTransform } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  RefreshTokenParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/auth/oauth/token',
  Logout = '/auth/signout',
  GetUserInfo = '/auth/user',
  GetPermCode = '/system/menu/permissions/',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defNoTokenHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      headers: {
        authorization: 'Basic emNsY3M6MTIzNDU2',
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

/**
 * 获取权限
 * @param username 用户名
 * @returns 权限
 */
export function getPermCode(username: string) {
  return defHttpWithTransform.get<string[]>({ url: Api.GetPermCode + username });
}

export function refreshTokenApi(params: RefreshTokenParams) {
  return defNoTokenHttp.post<LoginResultModel>({
    url: Api.Login,
    headers: {
      authorization: 'Basic emNsY3M6MTIzNDU2',
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    params,
  });
}

export function doLogout() {
  return defHttp.delete({ url: Api.Logout });
}
