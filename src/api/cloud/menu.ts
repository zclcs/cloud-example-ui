import { defHttpWithTransform } from '/@/utils/http/axios';
import { MenuModel } from './model/menuModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  MENU = '/system/menu',
}

export const createMenuApi = (params: MenuModel) =>
  defHttpWithTransform.post<void>({
    url: Api.MENU,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateMenuApi = (params: MenuModel) =>
  defHttpWithTransform.put<void>({
    url: Api.MENU,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteMenuApi = (menuIds: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.MENU + '/' + menuIds,
  });
