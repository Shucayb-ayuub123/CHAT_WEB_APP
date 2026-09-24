import { create } from "zustand";
import { axiosInstance } from "../lib/Axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigingnUp: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in auth check:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigingnUp: true })
        try {
            const res = await axiosInstance.post("/auth/singUp", data)
            set({ authUser: res.data })
            toast.success("Account created")
        } catch (error) {

            toast.error(error.response.data.message)

        } finally {
            set({ isSigingnUp: false })
        }
    }


}));