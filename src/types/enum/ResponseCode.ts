export const ResponseCode = {
  SUCCESS: 1000,
  ALREADY_EXIST_PROFILE_ID: 4005,
  SIGN_UP_NEDDED: 5000,
  JWT_TOKEN_DOES_NOT_EXIST: 7001,
} as const;

export type ResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];
