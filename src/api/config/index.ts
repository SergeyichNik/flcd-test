import axios from "axios";

export const api = axios.create({
    baseURL: "https://test.flcd.ru/api/",
    headers: {
        withCredentials: true
    }
})