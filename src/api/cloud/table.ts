import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  TABLE = '/dict/table',
  LIST = '/list',
}

export const createTableApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.TABLE,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateTableApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.TABLE,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteTableApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.TABLE + '/' + ids,
  });

export const getTablePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLE, params });

export const getTableList = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLE + Api.LIST, params });
