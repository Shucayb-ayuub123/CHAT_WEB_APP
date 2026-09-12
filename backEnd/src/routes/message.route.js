import express from "express"

const router  = express.Router()

router.get("/send" ,(req,res) => {
    return res.json("Message is sending into")
})

export default router