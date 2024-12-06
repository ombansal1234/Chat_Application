import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
// import { io } from 'socket.io-client';


export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth: async() => {
        try{
          // this api will give is the user is login or not by use of cookies to get token to verify
          const res = await axiosInstance.get("/auth/check");
          if(res.data.message==="success"){
            set({authUser:res.data})
          }else{
            set({authUser:null})
          }  
        }catch (error) {
          console.log(error.message)
        }finally{
          set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        set({isSigningUp:true});
        try{
          const res = await axiosInstance.post("/auth/signup",data);
          set({authUser: res.data});
          console.log(res)
          toast.success("Account created Successfully");
        }catch(error){
          toast.error(error.response.data.message);
          console.log(error)
        }finally{
          set({isSigningUp:false});
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          console.log(res)
          if(res.data.message==="success"){
            set({ authUser: res.data });
            toast.success("Logged in successfully");
          }else{
            set({ authUser: null});
          }
    
          // get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          // get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          console.log(data)
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    

}));