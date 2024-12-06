import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    onlineUsers:[],

    resetSelectedUser:()=>{
        set({selectedUser:null})
    },

    //gettting users for sidde bar diplay
    getUsers:async()=>{
        set({isUserLoading:true})
        try{
            const res=await axiosInstance.get("/messages/users")
            set({users:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try{
            const res=await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser  } = get();
        try {
            const res = await axiosInstance.post(`/messages/${selectedUser ._id}`, messageData);
            console.log(res)
            // Update messages state immediately
            set((state) => ({
                messages: [...state.messages, res.data],
            }));
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        }
    },
    
    addMessage: (newMessage) => set((state) => ({
        messages: [...state.messages, newMessage], // Append new message to existing messages
    })),

    setSelectedUser:(selectedUser)=>set({selectedUser}),

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
            messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

}))