export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  list: T[];
  total: number;
}
