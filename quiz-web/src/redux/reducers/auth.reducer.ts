import { AppAction } from '../../types/redux/action.type';
import { AppState } from '../../types/redux/state.type';
import { ActionTypes } from '../../types/redux/types.type';

export const initialAuthState: AppState = {
  isAuthenticated: false,
  user: null,
};

const appReducer = (state = initialAuthState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, isAuthenticated: true };
    case ActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };
    case ActionTypes.LOGGEDIN_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default appReducer;
