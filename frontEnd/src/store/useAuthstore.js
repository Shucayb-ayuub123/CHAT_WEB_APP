import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser : {name : "shu'aib" , age: 30},
    isLoading : false,
    Login : () => {
        console.log("is Login to every body")
        set({isLoading : true})
    }
}))