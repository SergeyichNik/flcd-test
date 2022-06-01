import {AppThunk, RootStateType} from "./store";
import {apiAuth} from "../api/api";
import {loadState, saveTokenInLocalStorage} from "../localStorage/localStorage";

type AuthReducerStateType = {
    email: string | null
    id: number | null
    name: string | null
    isLoggedIn: boolean
    token: string | null
}

const initialState: AuthReducerStateType = {
    email: null,
    name: null,
    id: null,
    isLoggedIn: false,
    token: null
}

export const authReducer =
    (
        state: AuthReducerStateType = initialState,
        action: AuthReducerActionsType
    ): AuthReducerStateType => {
    switch (action.type) {
        case "SET_IS_LOGGED_IN":
            return {
                ...state,
                ...action.payload
            };
        case "SET_USER_SELF_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}

//actionsCreators

export const setIsLoggedIn = (isLoggedIn: boolean, token: string | null) => {
    return {
        type: "SET_IS_LOGGED_IN",
        payload: {
            isLoggedIn,
            token,
        }
    } as const
}

export const setUserSelfData = (email: string | null, id: number | null, name: string | null) => {
    return {
        type: "SET_USER_SELF_DATA",
        payload: {
            email,
            id,
            name,
        }
    } as const
}


//thunk Creators

export const signUpTC = (name: string, email: string, password: string, password_confirmation: string): AppThunk =>
    (
        dispatch
    ) => {
    apiAuth.signUp(name, email, password, password_confirmation).then(res => {
        console.log(res);

    })
}

export const loginTC = (email: string, password: string): AppThunk =>
    (
        dispatch
    ) => {
    apiAuth.signIn(email, password)
        .then(res => {
           if (res.status >= 200 && res.status < 300) {
               dispatch(setIsLoggedIn(true, res.data.token))
               saveTokenInLocalStorage(res.data.token)
           }
        })
        .catch(e => {
            const error = e.response ? e.response.data.message : e.message;
            console.log(error)
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
                    dispatch(setIsLoggedIn(true, token))
                    dispatch(setUserSelfData(email, id, name))
                })
                .catch(err => {
                    dispatch(setIsLoggedIn(false, null))
                    console.log(err.response.data.message)
                })
        }

    }
//selector
export const selectAuth = (state: RootStateType) => state.auth
//types
export type AuthReducerActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setUserSelfData>