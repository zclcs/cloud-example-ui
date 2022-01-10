import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  BLOCKLOG = '/system/blockLog',
}

export function createBlockLogApi(params: any) {
  return defHttpWithTransform.post<void>({
    url: Api.BLOCKLOG,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
}

export const updateBlockLogApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.BLOCKLOG,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteBlockLogApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.BLOCKLOG + '/' + ids,
  });

export const getBlockLogPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.BLOCKLOG, params });
