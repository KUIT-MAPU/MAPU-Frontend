export const ResponseCode = {
  LOGGED_IN: 1000,
  SIGN_UP_NEDDED: 5000,
  JWT_TOKEN_DOES_NOT_EXIST: 7001,
} as const;

export type ResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];
