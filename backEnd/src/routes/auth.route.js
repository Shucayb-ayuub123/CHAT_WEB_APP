import express from "express"
import { singUp } from "../controller/user.controllers.js"
const router = express.Router()

router.post("/singUp",singUp)
// router.get("/login", (req, res) => {
//     return res.json("hellow")
// })
// router.get("/logout", (req, res) => {
//     return res.json("hellow")
// })

export default router