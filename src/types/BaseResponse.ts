import { LoginSuccess } from './auth/login';

export type BaseResponse = {
  code: number;
  status: number;
  message: string;
  result?: LoginSuccess;
  timestamp?: string;
};
