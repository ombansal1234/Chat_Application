import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==="development"?"http://localhost:3100/api":"/api",
    withCredentials:true, //send cookies in every single request
})