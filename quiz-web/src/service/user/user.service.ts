import { AxiosResponse } from 'axios';
import { ILoginResponse, TCreateUser } from '../../types/user.type';
import { post } from '../../wrappers/request';

/**
 * registers user
 * @param {TCreateUser} userData
 * @returns {Promise<AxiosResponse>}
 */
export const googleAuth = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('auth/register', userData);
};


export const getexistUser = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('users/existUser', userData);
};
export const register = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('auth/register', userData);
};
export const createShadowUser = async (): Promise<AxiosResponse<ILoginResponse>> => {
  return post('auth/shadow/register', {});
};
export const getTicket = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('users/ticket/getall', userData);
};
export const getHandleTip = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('users/handletip', userData);
};

export const setAvatar = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('users/setavatar', userData);
};
export const reduceTicket = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('users/ticket/useticketquiz', userData);
};

