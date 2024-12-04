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
    },

    signup: async (data) => {
        set({isSignUp:true});

        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data});
            toast.success("Account created Successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSignUp:false});
        }
    },

    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

}));