import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  RATELIMITLOG = '/system/rateLimitLog',
}

export function createRateLimitLogApi(params: any) {
  return defHttpWithTransform.post<void>({
    url: Api.RATELIMITLOG,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
}

export const updateRateLimitLogApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.RATELIMITLOG,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteRateLimitLogApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.RATELIMITLOG + '/' + ids,
  });

export const getRateLimitLogPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.RATELIMITLOG, params });
