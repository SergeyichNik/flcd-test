import {AppStatusesType} from "../types";

export const setErrorMessageAC = (error: string | null) => ({type: "SET_ERROR_MESSAGE", payload: {error}} as const)
export const setAppStatusAC = (status: AppStatusesType) => ({type: "SET_APP_STATUS",payload: {status}} as const)
export const setSuccessMessageAC = (success: string | null) => ({type: "SET_SUCCESS_MESSAGE", payload: {success}} as const)