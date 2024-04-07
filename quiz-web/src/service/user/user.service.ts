import { AxiosResponse } from 'axios';
import { ILoginResponse, TCreateUser } from '../../types/user.type';
import { post } from '../../wrappers/request';

/**
 * registers user
 * @param {TCreateUser} userData
 * @returns {Promise<AxiosResponse>}
 */
export const register = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('auth/register', userData);
};

export const createShadowUser = async (): Promise<AxiosResponse<ILoginResponse>> => {
  return post('auth/shadow/register', {});
};
