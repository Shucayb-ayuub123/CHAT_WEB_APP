import User from "../model/User.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utility.js"

export const singUp = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        if (!fullName, !email, !password) {
            return res.status(400).json({ message: "all fields are require" })
        }

        if (password.length < 6) {

            return res.status(400).json({ message: "password  must be at least 6 character" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {

            return res.status(400).json({ message: "invalid  email format " })
        }


        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            
            generateToken(newUser._id, res)
            
            await newUser.save()
            
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.ProfilePic
            })
            
        } else {
            
            return res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
         
        console.log("Error in signup" , error)
    }
}