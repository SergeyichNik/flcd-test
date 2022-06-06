export {
    setIsLoggedInAC,
    setAppStatusAC,
    setUserSelfDataAC,
    setErrorMessageAC,
    removePostAC,
    updatePostAC,
    setPostsAC,
    updateNewPostTextAC,
    addNewPostAC,
    setCurrentPostAC,
} from "./actions"

export type {
    PostType,
    AppReducerActionsTypes,
    AuthReducerActionsType,
    AppStatusesType,
    AppReducerStateType,
    AuthReducerStateType,
    CommentType,
    StateType,
    PostsReducerActionsType,
} from "./types/index"

export {
    loginTC,
    signUpTC,
    createNewPostTC,
    getUserInfoTC,
    fetchCurrentPostTC,
    updatePostTextTC,
    removePostTC,
    fetchPostsTC,
} from "./middlewares"

export {
    authReducer,
    appReducer,
    postsReducer,
} from "./reducers"

export {
    selectAuth,
    selectPosts,
    selectApp,
} from "./selectors"