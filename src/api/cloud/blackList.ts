import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  BLACKLIST = '/system/blackList',
}

export function createBlackListApi(params: any) {
  return defHttpWithTransform.post<void>({
    url: Api.BLACKLIST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
}

export const updateBlackListApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.BLACKLIST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteBlackListApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.BLACKLIST + '/' + ids,
  });

export const getBlackListPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.BLACKLIST, params });
