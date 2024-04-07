import { TMiscellaneousSettings } from "../../types/miscellaneous.type";
import { TMiscellaneousAction } from "../../types/redux/action.type";
import { ActionTypes } from "../../types/redux/types.type";

export const initialMiscellaneousState: TMiscellaneousSettings = {
    topBarVisibility: true,
};

const miscellaneousReducer = (state = initialMiscellaneousState, action: TMiscellaneousAction): TMiscellaneousSettings => {
    switch (action.type) {
        case ActionTypes.SET_MISCELLANEOUS_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default miscellaneousReducer;