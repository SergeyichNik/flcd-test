export type SignInResType = {
    token: string
}

export type SignUpReqType = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export type GetUserSelfResType = {
    created_at: string
    email: string
    id: number
    name: string
}

export type DeletePostType = string[]

export type SetPostResType = {
    created_at: string
    id: number
    text: string
    updated_at: string
    user_id: number
}