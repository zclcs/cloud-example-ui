import { defHttpWithTransform } from '/@/utils/http/axios';
import { RoleModel } from './model/roleModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  ROLE = '/system/role',
}

export const createRoleApi = (params: RoleModel) =>
  defHttpWithTransform.post<void>({
    url: Api.ROLE,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateRoleApi = (params: RoleModel) =>
  defHttpWithTransform.put<void>({
    url: Api.ROLE,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteRoleApi = (roleIds: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.ROLE + '/' + roleIds,
  });
