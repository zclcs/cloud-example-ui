import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type UserParams = BasicPageParams & {
  username?: string;
};

export type UserLogParams = BasicPageParams & {
  username?: string;
  operation?: string;
  location?: string;
  createTimeFrom?: string;
  createTimeTo?: string;
};

export type RoleParams = {
  roleName?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
};

export interface UserListItem {
  userId: number;
  username: string;
  email: string;
  roleIds: string[];
  roleNames: string[];
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptTreeItem {
  id: number;
  label: string;
  orderNum: string;
  children: DeptTreeItem[];
}

export interface DeptListItem {
  deptId: number;
  deptName: string;
  orderNum: string;
  createTime: string;
}

export interface MenuListItem {
  id: number;
  label: string;
  path: string;
  component: string;
  perms: string;
  icon: string;
  type: string;
  hideMenu: string;
  ignoreKeepAlive: string;
  orderNum: string;
  createTime: string;
}

export interface RoleListItem {
  roleId: number;
  roleName: string;
  menuIds: number[];
  remark: string;
  createTime: string;
}

export interface UserLogListItem {
  id: number;
  username: string;
  operation: string;
  time: string;
  method: string;
  params: string;
  ip: string;
  createTime: string;
  location: string;
}

/**
 * @description: Request list return value
 */
export type UserPageGetResultModel = BasicFetchResult<UserListItem>;

export type UserLogPageGetResultModel = BasicFetchResult<UserLogListItem>;

export type DeptTreeGetResultModel = BasicFetchResult<DeptTreeItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
