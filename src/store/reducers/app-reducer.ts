import {AppReducerActionsTypes, AppReducerStateType} from "../types";

const initialState: AppReducerStateType = {
    error: null,
    status: "IDLE"
}

export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionsTypes) => {
    switch (action.type) {
        case "SET_ERROR_MESSAGE":
        case "SET_APP_STATUS":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}