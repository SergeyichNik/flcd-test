import axios from "axios";

export const api = axios.create({
    baseURL: "https://test.flcd.ru/api/",
    headers: {
        withCredentials: true
    }
})

// api.interceptors.request.use((config) => {
//     if (config.headers) {
//         return config.headers.authorization = `Bearer ${loadState()}`
//     }
//     return config
// })


export const apiPosts = {
    getPosts() {
        return api.get(`post`)
    },
    getPost(id: number) {
        return api.get(`post/${id}`)
    },
    setPost(text: string, token: string | null) {
        return api.post<SetPostResType>("post", {text}, {headers: {authorization: `Bearer ${token}`}})
    },
    updatePost(id: number, text: string, token: string | null) {
        return api.patch(`post/${id}`, {text}, {headers: {authorization: `Bearer ${token}`}})
    }
}

export const apiAuth = {
    signUp(name: string, email: string, password: string, password_confirmation: string) {
        return api.post("register", {name, email, password, password_confirmation})
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

type GetUserSelfResType = {
    created_at: string
    email: string
    id: number
    name: string
}

type SetPostResType = {
    created_at: string
    id: number
    text: string
    updated_at: string
    user_id: number
}
// apiAuth.signUp("name", "woxas77376@nifect.com", "qwertyqwerty", "qwertyqwerty").then(res => console.log(res))