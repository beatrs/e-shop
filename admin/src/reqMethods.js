import axios from "axios"

const API_URL = "http://localhost:5000/api/"

const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser
const TOKEN = user && JSON.parse(user)?.token

export const genRequest = axios.create({
    baseURL: API_URL
})

export const userRequest = axios.create({
    baseURL: API_URL,
    headers: { token: `Bearer ${TOKEN}` }
})