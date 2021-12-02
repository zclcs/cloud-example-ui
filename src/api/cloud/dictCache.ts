import { defHttp } from '/@/utils/http/axios';

enum Api {
  DICT = '/dict/cache',
}

export const getDictTitle = (params: any) => defHttp.get<any>({ url: Api.DICT, params });

export const getDict = (params: any) => defHttp.get<any>({ url: Api.DICT + '/' + params.dict });
