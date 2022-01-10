import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  ROUTELOG = '/system/routeLog',
}

export function createRouteLogApi(params: any) {
  return defHttpWithTransform.post<void>({
    url: Api.ROUTELOG,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
}

export const updateRouteLogApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.ROUTELOG,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteRouteLogApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.ROUTELOG + '/' + ids,
  });

export const getRouteLogPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.ROUTELOG, params });
