export const setIsLoggedInAC = (isLoggedIn: boolean, token: string | null) => {
    return {
        type: "SET_IS_LOGGED_IN",
        payload: {
            isLoggedIn, token,}} as const
}

export const setUserSelfDataAC = (email: string | null, id: number | null, name: string | null) => {
    return {
        type: "SET_USER_SELF_DATA",
        payload: {
            email,
            id,
            name,
        }
    } as const
}

