import express from "express"
import { Login, Logout, singUp , updateProfile } from "../controller/user.controllers.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/singUp",singUp)
router.post("/login",Login)
router.post("/logout",Logout)
router.put("/updateProfile",protectRoute ,upload.single("image") ,  updateProfile)
router.get("/check" , protectRoute , (req,res) => res.status(200).json(req.user))

export default router