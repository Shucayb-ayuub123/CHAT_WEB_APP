import User from "../model/User.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utility.js"
import { sendWelcomeEmail } from "../email/emailHandler.js"
import "dotenv/config"
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

            const savedUser = await newUser.save();

            generateToken(savedUser._id, res);

            try {
                await sendWelcomeEmail(
                    savedUser.email,
                    savedUser.fullName,
                    process.env.CLIENT_URL
                );
            } catch (error) {
                console.error("Welcome email error:", error);
            }

            res.status(201).json({
                _id: savedUser._id,
                fullname: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.ProfilePic
            });

        } else {

            return res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {

        console.log("Error in signup", error)
    }
}