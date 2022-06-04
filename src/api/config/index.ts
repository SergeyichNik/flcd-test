import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || "https://test.flcd.ru/api/" ,
    headers: {
        withCredentials: true
    }
})