import {
  UserParams,
  UserLogParams,
  DeptTreeItem,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptTreeGetResultModel,
  UserPageGetResultModel,
  UserLogPageGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  UserPage = '/system/user',
  UserLogPage = '/system/log',
  IsUserExist = '/system/user/check/',
  IsRoleExist = '/system/role/check/',
  DeptTree = '/system/dept/options',
  DeptList = '/system/dept/list',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/menu',
  RolePageList = '/system/role',
  GetAllRoleList = '/system/role/options',
}

export const getUserPage = (params: UserParams) =>
  defHttpWithTransform.get<UserPageGetResultModel>({ url: Api.UserPage, params });

export const getUserLogPage = (params: UserLogParams) =>
  defHttpWithTransform.get<UserLogPageGetResultModel>({ url: Api.UserLogPage, params });

export const getDeptTree = (params?: DeptTreeItem) =>
  defHttpWithTransform.get<DeptTreeGetResultModel>({ url: Api.DeptTree, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttpWithTransform.get<DeptListItem>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttpWithTransform.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttpWithTransform.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttpWithTransform.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttpWithTransform.post({ url: Api.setRoleStatus, params: { id, status } });

export const isUserExist = (userId: number, account: string) =>
  defHttpWithTransform.get(
    { url: Api.IsUserExist + userId + '/' + account },
    { errorMessageMode: 'none' },
  );

export const isRoleExist = (roleId: number, roleName: string) =>
  defHttpWithTransform.get(
    { url: Api.IsRoleExist + roleId + '/' + roleName },
    { errorMessageMode: 'none' },
  );
