import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
const app = express()


const PORT  = process.env.PORT || 3000

app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute)

app.listen(PORT  , () => console.log(`server is running at port ${PORT}`))