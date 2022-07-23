import axios from "axios"

const LOCAL_URL = "http://localhost:5000/api/"
const API_URL = "https://wiz-shop.herokuapp.com/api/"

const BASE_URL = process.env.ENV === 'production' ? API_URL : LOCAL_URL

const user = JSON.parse(localStorage.getItem("persist:root"))?.user
const TOKEN = user && JSON.parse(user)?.currentUser?.token
console.log('token', TOKEN)
export const genRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})