import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  COMPANY = '/test/company',
  LIST = '/list',
}

export const createCompanyApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.COMPANY,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateCompanyApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.COMPANY,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteCompanyApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.COMPANY + '/' + ids,
  });

export const getCompanyPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.COMPANY, params });

export const getCompanyList = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.COMPANY + Api.LIST, params });
