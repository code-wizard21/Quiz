import { TMiscellaneousSettings } from '../miscellaneous.type';
import {
  TGeneralSettings,
} from '../settings.type';
import { IUser } from '../user.type';

export interface AppState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export type TSettingsState = {
  generalSettings: TGeneralSettings;
};

export type TMiscellaneousState = {
  miscellaneousSetting: TMiscellaneousSettings;
};