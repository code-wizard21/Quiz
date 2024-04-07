import { Middleware, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import appReducer, { RootState } from '../reducers';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import createMigrate from 'redux-persist/es/createMigrate';
import { initialAuthState } from '../reducers/auth.reducer';
import { initialSettingState } from '../reducers/settings.reducer';
import { initialMiscellaneousState } from '../reducers/mescellaneous.reducer';

const migrations = {
  0: (state: any) => {
    return {
      ...state,
      auth: {
        ...initialAuthState,
        ...state.auth,
      },
      setting: {
        ...initialSettingState,
        ...state.settings,
      },
    };
  },
  1: (state: any) => {
    return {
      ...state,
      auth: {
        ...initialAuthState,
        ...state.auth,
      },
      setting: {
        ...initialSettingState,
        ...state.settings,
      },
      miscellaneous: {
        ...initialMiscellaneousState,
        ...state.miscellaneous,
      },
    };
  },
};

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage,
  debug: true,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const middleware: Middleware[] = [thunk as ThunkMiddleware<RootState>];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);