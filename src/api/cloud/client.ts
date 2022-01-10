import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  CLIENT = '/auth/client',
}

export const createClientApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.CLIENT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateClientApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.CLIENT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteClientApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.CLIENT + '/' + ids,
  });

export const getClientPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.CLIENT, params });

export const checkClientId = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.CLIENT, params });
