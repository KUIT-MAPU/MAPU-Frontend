export const RegisterStatus = {
  NEED_LOG_IN: '미로그인',
  SIGNING_UP: '회원가입 중',
  LOG_IN: '로그인 중',
} as const;

export type RegisterStatus =
  (typeof RegisterStatus)[keyof typeof RegisterStatus];
