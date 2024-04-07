export type TOrderBy<T = any> = {
  /**
   * The column you want to sort
   */
  key: keyof T;
  /**
   * Direction of sorting
   *
   * + asc &rarr; Ascending <br>
   * + desc &rarr; Descending
   */
  type: 'asc' | 'desc';
};
export type TPagination = {
  limit?: number;
  page?: number;
};
export type TColumnSelect<T = any> = (keyof T)[] | '*';
export type TSelector = {
  select?: TColumnSelect;
  orderBy?: TOrderBy;
  pagination?: TPagination;
};

export type TResponseData = {
  status: number;
  data: any;
};

export type TMessageResponse = {
  status: number;
  message?: string;
};

export type ApiResponseData<T> = {
  data: T[];
  status: number;
};

// export type TElectronResponse = { status: number; message?: any; data?: any };
