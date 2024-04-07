import { ActionTypes } from '../../types/redux/types.type';
import { IUser } from '../../types/user.type';

export const login = () => {
  return {
    type: ActionTypes.LOGIN,
  };
};

export const logoutUserData = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};

export const setUserData = (data: IUser) => {
  return {
    type: ActionTypes.LOGGEDIN_USER_DATA,
    payload: data,
  };
};
