import { AxiosResponse } from 'axios';
import { TAuthCredentials, TForgetPassword, TResetPassword } from '../../types/auth.type';
// import { ILoggedInUser } from 'common/types/user.type';
import { post } from '../../wrappers/request';

/**
 * calls api to authenticate user
 * @param credentials User credentials
 * @returns {Promise<AxiosResponse>}
 */
export const login = async (credentials: TAuthCredentials): Promise<AxiosResponse> => {
  console.log('credentials',credentials);
  return post('auth/user/login', credentials);
};

/**
 * calls api to destroy user session
 * @returns {Promise<AxiosResponse>}
 */
export const logout = async (refreshToken: string): Promise<AxiosResponse> => {
  return post('auth/logout', { refresh_token: refreshToken });
};

/**
 * calls API to get user token to reset password
 * @param forgetPassword Forget password data
 * @returns {Promise<AxiosResponse>}
 */
export const forgotPassword = async (forgetPassword: TForgetPassword): Promise<AxiosResponse> => {
  return post('auth/forgot-password', forgetPassword);
};

/**
 * Calls backend API to reset user password
 * @param resetPassword Forget password data
 * @returns {Promise<AxiosResponse>}
 */
export const resetPassword = async (resetPassword: TResetPassword): Promise<AxiosResponse> => {
  return post('reset-password', resetPassword);
};