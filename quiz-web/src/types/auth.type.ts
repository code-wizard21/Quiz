export type TAuthResponse = {
  accessToken: string;
  expiresAt: number;
  expiresIn: number;
  refreshExpiresAt: number;
  refreshExpiresIn: number;
};

export type TForgetPasswordResponse = {
  message: string;
};

export type TAuthCredentials = {
  email: string;
  password: string;
};

export type TAuthDataSet = {
  user: TAuthResponse;
};

export type TResetPassword = {
  code: string;
  password: string;
  confirmPassword: string;
};

export type TForgetPassword = {
  email: string;
};
