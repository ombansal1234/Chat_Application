import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check");
            console.log("result")
            console.log(res)
            set({authUser:res.data})
        }catch (error) {
            console.log("Error in checkAuth:");
            console.log(error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    }

}));