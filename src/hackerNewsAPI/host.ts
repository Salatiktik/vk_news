import axios from "axios";

const base ='https://hacker-news.firebaseio.com/v0'

export const $host = axios.create({
    baseURL: base
})