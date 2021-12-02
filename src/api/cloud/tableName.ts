import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  TABLENAME = '/dict/tableName',
  LIST = '/list',
}

export const createTableNameApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.TABLENAME,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateTableNameApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.TABLENAME,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteTableNameApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.TABLENAME + '/' + ids,
  });

export const getTableNamePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLENAME, params });

export const getTableNameList = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.TABLENAME + Api.LIST, params });
