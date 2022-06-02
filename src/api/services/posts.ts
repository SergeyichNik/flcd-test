import {PostType} from "../../store/posts-reducer";
import {api} from "../config";
import {DeletePostType, SetPostResType} from "../types";

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