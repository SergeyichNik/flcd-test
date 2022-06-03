import {Dispatch} from "redux";
import {AppReducerActionsTypes, setErrorMessageAC} from "../store";


export const handleServerAppError =
    (
        err: ErrRes<ResTypeA & ResTypeB> & ResTypeA ,
        dispatch: Dispatch<AppReducerActionsTypes>
    ) => {

    let error = err.response.data ? err.response.data.message : err.message

    dispatch(setErrorMessageAC(error))
}

type ErrRes<T> = {
    response: {
        data: T
    }

}

type ResTypeA = {
    message: string
}

type ResTypeB = {
    errors: string[]
}
