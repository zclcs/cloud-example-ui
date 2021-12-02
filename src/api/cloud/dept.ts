import { defHttpWithTransform } from '/@/utils/http/axios';
import { DeptModel } from './model/deptModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  DEPT = '/system/dept',
}

export const createDeptApi = (params: DeptModel) =>
  defHttpWithTransform.post<void>({
    url: Api.DEPT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateDeptApi = (params: DeptModel) =>
  defHttpWithTransform.put<void>({
    url: Api.DEPT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteDeptApi = (deptIds: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.DEPT + '/' + deptIds,
  });
