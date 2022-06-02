import {RootStateType} from "./store";

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
//selector
export const selectApp = (state: RootStateType) => state.app

//actionCreators

export const setErrorMessageAC = (error: string) => {
    return {
        type: "SET_ERROR_MESSAGE",
        payload: {
            error
        }
    } as const
}

export const setAppStatusAC = (status: AppStatusesType) => {
    return {
        type: "SET_APP_STATUS",
        payload: {
            status
        }
    } as const
}

//types

export type AppReducerStateType = {
    error: string | null,
    status: AppStatusesType
}

export type AppReducerActionsTypes =
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setAppStatusAC>

export type AppStatusesType = "SUCCESS" | "FAILED" | "LOADING" | "IDLE"