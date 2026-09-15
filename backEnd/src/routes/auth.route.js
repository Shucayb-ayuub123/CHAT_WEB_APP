import express from "express"
import { Login, Logout, singUp } from "../controller/user.controllers.js"
const router = express.Router()

router.post("/singUp",singUp)
router.post("/login",Login)
router.post("/logout",Logout)

export default router