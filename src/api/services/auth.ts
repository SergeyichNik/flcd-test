import {api} from "../config";
import {GetUserSelfResType, SignInResType, SignUpReqType} from "../types";

export const apiAuth = {
    signUp(data: SignUpReqType) {
        return api.post("register", data)
    },
    signIn(email: string, password: string) {
        return api.post<SignInResType>("token", {email, password})
    },
    getUserSelf(token: string | null) {
        return api.get<GetUserSelfResType>("user/self", {headers: {authorization: `Bearer ${token}`}})
    }
}