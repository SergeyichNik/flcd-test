import {Dispatch} from "redux";
import {AppReducerActionsTypes, setErrorMessageAC} from "../store";


export const handleServerAppError =
    (
        err: ErrRes<ResTypeA>,
        dispatch: Dispatch<AppReducerActionsTypes>
    ) => {
        console.log(err)

        if (err.code === "ERR_NETWORK") {
            dispatch(setErrorMessageAC(err.message))
            return;
        }



        if (err.response.data) {
            if (err.response.data.message) {
                dispatch(setErrorMessageAC(err.response.data.message))
                return
            }
            if (err.response.data.errors) {
                if (err.response.data.errors.length) {
                    dispatch(setErrorMessageAC(err.response.data.errors[0]))
                    return
                }
            }
        }
    }

        type ErrRes<T> = {
            code: string
            message: string
            response: {
                data: T
            }

        }

        type ResTypeA = {
            message: string
            errors: string[]
        }
