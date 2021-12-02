import { defHttpWithTransform } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/system/menu/',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (username: string) => {
  return defHttpWithTransform.get<getMenuListResultModel>({ url: Api.GetMenuList + username });
};
