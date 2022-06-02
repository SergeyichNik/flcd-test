import {AuthReducerActionsType, AuthReducerStateType} from "../types";

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
