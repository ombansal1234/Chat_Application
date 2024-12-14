import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:3100/api",
    withCredentials:true, //send cookies in every single request
})