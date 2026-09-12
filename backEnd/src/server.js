import express from 'express'
import dotenv from "dotenv"
import path from "path"
dotenv.config()
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
const app = express()


const PORT  = process.env.PORT || 3000

const __dirname = path.resolve()
app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname , "../frontEnd/dist")))
    app.get("/{*splat}" , (req,res) => {    
        res.sendFile(path.join(__dirname , "../frontEnd" , "dist" , "index.html"))
    })
}

app.listen(PORT  , () => console.log(`server is running at port ${PORT}`))