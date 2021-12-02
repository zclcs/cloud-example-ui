import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  TABLELEVEL = '/dict/tableLevel',
  LIST = '/list',
  OPTION = '/option',
}

export const createTableLevelApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.TABLELEVEL,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateTableLevelApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.TABLELEVEL,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteTableLevelApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.TABLELEVEL + '/' + ids,
  });

export const getTableLevelTree = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLELEVEL, params });

export const getTableLevelList = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLELEVEL + Api.LIST, params });

export const getTableLevelOption = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLELEVEL + Api.OPTION, params });
