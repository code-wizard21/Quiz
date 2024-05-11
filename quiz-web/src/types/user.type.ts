import { IBaseUser } from '.';
import { USER_ROLE } from '../constants/enum';

interface IToken {
  expires: Date;
  token: string;
}

export interface IUser extends IBaseUser {
  password: string;
  role: USER_ROLE.HOST | USER_ROLE.USER | USER_ROLE.SHADOW;
  remember?: boolean;
}

export interface ILoginResponse {
  user: IUser;

  tokens: {
    access: IToken;
    refresh: IToken;
  };
}
export type TCreateUser = {
  shadow_user_id?: string;
  email: string;
  password: string;
  name: string;
  mobile?: string;
  device_token?: string;
  refresh_token?: string;
};
