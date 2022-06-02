import {AppStatusesType} from "../types";

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