import express from "express"
import { getAllContacts, getChatsByuserId, sendMessage, getChatpartners } from "../controller/message.controllers.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { arcjetProjection } from "../middleware/arcjet.middleware.js"
const router = express.Router()
router.use(arcjetProjection , protectRoute)
router.get("/contact", getAllContacts)
router.get("/chat", getChatpartners)
router.get("/:id", getChatsByuserId)

router.post("/send/:id", sendMessage)


export default router