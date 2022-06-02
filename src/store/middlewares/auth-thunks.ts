import {SignUpReqType} from "../../api/types";
import {AppThunk} from "../store";
import {apiAuth} from "../../api";
import {handleServerAppError} from "../../utils/error-utils";
import {loadState, saveTokenInLocalStorage} from "../../localStorage/localStorage";
import {setAppStatusAC, setIsLoggedInAC, setUserSelfDataAC} from "../actions";

export const signUpTC = (model: SignUpReqType): AppThunk =>
    (
        dispatch
    ) => {
        dispatch(setAppStatusAC("LOADING"))
        apiAuth.signUp(model)
            .then(res => {
                console.log(res);
                dispatch(setAppStatusAC("SUCCESS"))
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
        apiAuth.signIn(email, password)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    dispatch(setIsLoggedInAC(true, res.data.token))
                    saveTokenInLocalStorage(res.data.token)
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
                    console.log(res.data.name)
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