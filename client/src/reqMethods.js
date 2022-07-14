import axios from "axios"

const BASE_URL = "http://localhost:5000/api/"

const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser
const TOKEN = user && JSON.parse(user)?.token

export const genRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})