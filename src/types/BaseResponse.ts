export type BaseResponse<T> = {
  code: number;
  status: number;
  message: string;
  result: T;
  timestamp?: string;
};
