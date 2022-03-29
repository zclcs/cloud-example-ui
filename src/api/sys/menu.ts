import { defHttpWithTransform } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  getRouter = '/system/menu/routers',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttpWithTransform.get<getMenuListResultModel>({ url: Api.getRouter });
};
