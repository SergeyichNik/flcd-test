import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {AppReducerActionsTypes, AuthReducerActionsType, PostsReducerActionsType} from "./types";
import {appReducer, authReducer, postsReducer} from "./reducers";


const reducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    app: appReducer
});

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof reducer>;
export type RootActionsTypes = PostsReducerActionsType | AuthReducerActionsType | AppReducerActionsTypes;
export type AppThunk = ThunkAction<void, RootStateType, unknown, RootActionsTypes>;

