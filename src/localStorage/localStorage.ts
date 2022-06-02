
const TOKEN_AUTH = "token"

export const loadState = () => {
    try {
        const serializedToken = localStorage.getItem(TOKEN_AUTH);
        if (serializedToken === null) {
            return null;
        }
        return JSON.parse(serializedToken)

    } catch (err) {
        return undefined
    }

};

export const saveTokenInLocalStorage = (token: string | null) => {
    try {
        const serializedToken = JSON.stringify(token)
        localStorage.setItem(TOKEN_AUTH, serializedToken)
    } catch {
    }
}