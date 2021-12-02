import { defHttpWithTransform } from '/@/utils/http/axios';
import { ConfigModel } from './model/configModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  config = '/generator/config',
}

export const getConfig = () => defHttpWithTransform.get<ConfigModel>({ url: Api.config });

export const updateConfigApi = (params: ConfigModel) =>
  defHttpWithTransform.put<void>({
    url: Api.config,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
