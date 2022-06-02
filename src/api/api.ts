import axios from "axios";
import {PostType} from "../store/posts-reducer";
import {loadState} from "../localStorage/localStorage";

export const api = axios.create({
    baseURL: "https://test.flcd.ru/api/",
    headers: {
        withCredentials: true
    }
})

const token = loadState()


api.interceptors.request.use(config => {
    if (config.headers) {
        config.headers.authorization = `Bearer ${token}`
    }
})


export const apiPosts = {
    getPosts() {
        return api.get<PostType[]>(`post`)
    },
    getPost(id: number) {
        return api.get<PostType>(`post/${id}`)
    },
    setPost(text: string, token: string | null) {
        return api.post<SetPostResType>("post", {text}, {headers: {authorization: `Bearer ${token}`}})
    },
    updatePost(id: number, text: string, token: string | null) {
        return api.patch(`post/${id}`, {text}, {headers: {authorization: `Bearer ${token}`}})
    },
    deletePost(id: number, token: string | null) {
        return api.delete<DeletePostType>(`post/${id}`, {headers: {authorization: `Bearer ${token}`}})
    }
}

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

//types
type SignInResType = {
    token: string
}

export type SignUpReqType = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

type GetUserSelfResType = {
    created_at: string
    email: string
    id: number
    name: string
}

type DeletePostType = string[]

type SetPostResType = {
    created_at: string
    id: number
    text: string
    updated_at: string
    user_id: number
}

// apiAuth.signUp("name", "woxas77376@nifect.com", "qwertyqwerty", "qwertyqwerty").then(res => console.log(res))