import express from "express"
const router = express.Router()

router.get("/singUp", (req, res) => {
    return res.json("hellow")
})
router.get("/login", (req, res) => {
    return res.json("hellow")
})
router.get("/logout", (req, res) => {
    return res.json("hellow")
})

export default router