import {SignUpReqType} from "../../api/types";
import {AppThunk} from "../store";
import {apiAuth} from "../../api";
import {handleServerAppError} from "../../utils/error-utils";
import {loadState, saveTokenInLocalStorage} from "../../localStorage/localStorage";
import {setAppStatusAC, setIsLoggedInAC, setSuccessMessageAC, setUserSelfDataAC} from "../actions";

export const signUpTC = (model: SignUpReqType): AppThunk =>
    (
        dispatch
    ) => {
        dispatch(setAppStatusAC("LOADING"))
        apiAuth.signUp(model)
            .then(res => {
                dispatch(setAppStatusAC("SUCCESS"))
                dispatch(setSuccessMessageAC("Success"))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC("IDLE"))
            })
    }

export const loginTC = (email: string, password: string): AppThunk =>
    (
        dispatch
    ) => {
        dispatch(setAppStatusAC("LOADING"))
        apiAuth.signIn(email, password)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    dispatch(setAppStatusAC("SUCCESS"))
                    dispatch(setIsLoggedInAC(true, res.data.token))
                    saveTokenInLocalStorage(res.data.token)
                    dispatch(setSuccessMessageAC("Success"))
                }
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
            })
    }

export const getUserInfoTC = (): AppThunk =>
    (
        dispatch,
    ) => {
        const token = loadState()
        if (token) {
            apiAuth.getUserSelf(token)
                .then(res => {
                    const {id, name, email} = res.data
                    dispatch(setIsLoggedInAC(true, token))
                    dispatch(setUserSelfDataAC(email, id, name))
                })
                .catch(err => {
                    dispatch(setIsLoggedInAC(false, null))
                    handleServerAppError(err, dispatch)
                })
        }

    }