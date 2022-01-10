import { defHttpWithTransform, defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  gen = '/generator/gen',
  datasource = '/datasource',
  tables = '/tables',
}

export const getDatasource = () => defHttpWithTransform.get<any>({ url: Api.gen + Api.datasource });

export const getTables = (params: any) =>
  defHttpWithTransform.get<void>({
    url: Api.gen + Api.tables,
    params: params,
  });

export const gen = (params: any) =>
  defHttp.post<any>({
    url: Api.gen,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
    responseType: 'blob',
  });
