import { IBaseUser } from '.';
import { USER_ROLE } from '../constants/enum';

interface IToken {
  expires: Date;
  token: string;
}

export interface IUser extends IBaseUser {
  password: string;
  avatar: string;
  shadowID:string;
  username: string;
  role: USER_ROLE.HOST | USER_ROLE.USER | USER_ROLE.SHADOW;
  remember?: boolean;
}

export interface ILoginResponse {
  user: IUser;
  redirectUrl: string;
  data:{
    status:string,
    pool:number,
    contestants:number,
    question_id:string,
    question_index:number,
    total_questions:number,
    avatar:string,
    amount:number,
    ticket:number,
    credit:number;
  }
  tokens: {
    access: IToken;
    refresh: IToken;
  };
}
export type TCreateUser = {
  shadow_user_id?: string;
  email?: string;
  id?: string;
  user?: string;
  amount?:number;
  ticket?:number;
  credit?:number;
  password?: string;
  name?: string;
  mobile?: string;
  device_token?: string;
  refresh_token?: string;
};

export interface IPayment {
  user: string;
  email: string;
  amount: number;
  ticket: number;
  credit: number;
}