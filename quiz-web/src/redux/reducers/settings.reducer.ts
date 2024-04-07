import { TSettingsAction } from '../../types/redux/action.type';
import { TSettingsState } from '../../types/redux/state.type';
import { ActionTypes } from '../../types/redux/types.type';

export const initialSettingState: TSettingsState = {
  generalSettings: {
    language: 'en',
  },
};

const settingsReducer = (
  state = initialSettingState,
  action: TSettingsAction
): TSettingsState => {
  switch (action.type) {
    case ActionTypes.SET_GENERAL_SETTINGS:
      return {
        ...state,
        generalSettings: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
