import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  RATELIMITRULE = '/system/rateLimitRule',
}

export function createRateLimitRuleApi(params: any) {
  return defHttpWithTransform.post<void>({
    url: Api.RATELIMITRULE,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
}

export const updateRateLimitRuleApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.RATELIMITRULE,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteRateLimitRuleApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.RATELIMITRULE + '/' + ids,
  });

export const getRateLimitRulePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.RATELIMITRULE, params });
