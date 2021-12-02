/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  grant_type: string;
  username: string;
  password: string;
  key: string;
  code: string;
}

export interface RefreshTokenParams {
  grant_type: string;
  refresh_token: string | undefined;
}

export interface Principal {
  // 用户角色
  roles: role[];
  // 用户角色id
  roleIds: number[];
  // 用户角色名称
  roleNames: string[];
  // 用户id
  userId: number;
  // 用户名
  username: string;
  homePath?: string;
}

export interface role {
  roleId: number;
  roleName: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  principal: Principal;
}
