import { AxiosResponse } from 'axios';
import { ILoginResponse, TCreateUser } from '../../types/user.type';
import { post } from '../../wrappers/request';

/**
 * registers user
 * @param {TCreateUser} userData
 * @returns {Promise<AxiosResponse>}
 */

export const googleAuth = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('users/googlelogin', userData);
};

export const checkOutBuyticketSessionSocket = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('payment/create-checkout-ticket-socket', userData);
};

export const checkOutBuyCreditSession = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('payment/create-checkout-credit', userData);
};


export const checkOutBuyticketSession = async (userData: TCreateUser): Promise<AxiosResponse<ILoginResponse>> => {
  return post('payment/create-checkout-ticket', userData);
};