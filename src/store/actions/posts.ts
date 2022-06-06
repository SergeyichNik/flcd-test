import {PostType} from "../types";

export const setPostsAC = (postsData: PostType[]) =>({type: "SET_POSTS", payload: {postsData}} as const)
export const updateNewPostTextAC = (text: string) => ({type: "SET_NEW_POST_TEXT", payload: {text}} as const)
export const updatePostAC = (id: number, model: PostType) => ({type: "UPDATE_POST", payload: {model, id}} as const)
export const setCurrentPostAC = (singlePost: PostType) => ({type: "SET_SINGLE_POST", payload: {singlePost}} as const)
export const addNewPostAC = (model: PostType) => ({type: "SET_NEW_POST", payload: {model}} as const)
export const removePostAC = (id: number) => ({type: "REMOVE_POST", payload: {id}} as const)
