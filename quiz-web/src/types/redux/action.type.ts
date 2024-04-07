import { ActionTypes } from './types.type';
import {
  TGeneralSettings,
} from '../settings.type';
import { IUser } from '../user.type';
import { TMiscellaneousSettings } from '../miscellaneous.type';

export interface LoginAction {
  type: ActionTypes.LOGIN;
}

export interface LogoutAction {
  type: ActionTypes.LOGOUT;
}

export interface LoggedInUserAction {
  payload: IUser;
  type: ActionTypes.LOGGEDIN_USER_DATA;
}

export type AppAction = LoginAction | LogoutAction | LoggedInUserAction;

export type TGeneralAction = {
  payload: TGeneralSettings;
  type: ActionTypes.SET_GENERAL_SETTINGS;
};

export type TSettingsAction =
  | TGeneralAction;

export type TMiscellaneousAction = {
  payload: TMiscellaneousSettings;
  type: ActionTypes.SET_MISCELLANEOUS_DATA;
};