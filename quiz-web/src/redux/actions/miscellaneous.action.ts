import { TMiscellaneousSettings } from '../../types/miscellaneous.type';
import { ActionTypes } from '../../types/redux/types.type';

export const setMiscellaneousData = (payload: TMiscellaneousSettings) => {
  return {
    type: ActionTypes.SET_MISCELLANEOUS_DATA,
    payload,
  };
};