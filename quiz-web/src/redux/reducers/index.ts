import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import settingsReducer from './settings.reducer';
import miscellaneousReducer from './mescellaneous.reducer';

const appReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  miscellaneous: miscellaneousReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
