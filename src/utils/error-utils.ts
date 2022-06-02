import {AppReducerActionsTypes, setErrorMessageAC} from "../store/app-reducer";
import {Dispatch} from "redux";


export const handleServerAppError = (err: any, dispatch: Dispatch<AppReducerActionsTypes>) => {
    if (err.response.data) {
        if (err.response.data.message === 'string') {
            dispatch(setErrorMessageAC(err.response.data.message))
        } else if (err.response.data.errors.length) {
            dispatch(setErrorMessageAC(err.response.data.errors[0]))
        }
    }  else {
        dispatch(setErrorMessageAC(err.message))
    }

}
