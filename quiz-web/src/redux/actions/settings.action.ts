import { ActionTypes } from '../../types/redux/types.type';
import {
  TGeneralSettings,
} from '../../types/settings.type';

export const setGeneralSettings = (payload: TGeneralSettings) => {
  return {
    type: ActionTypes.SET_GENERAL_SETTINGS,
    payload,
  };
};
