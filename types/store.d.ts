import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface Principal {
  // 用户角色id
  roleIds: string;
  // 用户角色名称
  roleNames: string;
  // 用户id
  userId: number;
  // 用户名
  username: string;
  homePath?: string;
}

export interface UserInfo {
  principal: Principal;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
