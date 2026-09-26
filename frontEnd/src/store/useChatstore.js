import { create } from "zustand";
import {axiosInstance} from "../lib/Axios.js"
import {toast} from "react-hot-toast"
export const useChatstore = create((set, get) => ({
       AllContacts: [],
       chats: [],
       messages: [],
       activetabs: "chats",
       selectedUser: null,
       isUserLoading: false,
       isMessageLoading: false,
       isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,
       toggleSound: () => {

              localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
              set({ isSoundEnabled: !get().isSoundEnabled })
       },
       setActiveTabs: (tabs) => {
              set({ activetabs: tabs })
       },
       setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),
       getAllContacts : async () => {
              set({isUserLoading:true})
              try {
                     const res = await axiosInstance.get("/message/contacts")
                     set({AllContacts : res.data})
              } catch (error) {
                     toast.error(error.response.data.messages)
              }finally {
                     set({isUserLoading : false})
              }
       },
       getChatPartner : async () => {
              set({isUserLoading:true})
              try {
                     const res = await axiosInstance.get("/message/chat")
                     set({chats : res.data})
              } catch (error) {
                     toast.error(error.response.data.messages)
              }finally {
                     set({isUserLoading : false})
              }
       }

}))