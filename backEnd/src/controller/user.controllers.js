import User from "../model/User.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utility.js"
import { sendWelcomeEmail } from "../email/emailHandler.js"
import "dotenv/config"
import supabase from "../lib/supabase.js"
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

export const Login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "All feild are reqiure" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credentail" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentail" })

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.ProfilePic
        })

    } catch (error) {
        console.error("Error in Login controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const Logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json("Logout it successfully. ")
}

export const updateProfile = async (req, res) => {
    const { ProfilePic } = req.body

    try {
        
    } catch (error) {
        
    }

    if (!ProfilePic) return res.status(400).json({ message: "Profile pic is require" })


    const { data, error } = await supabase.storage
        .from('medai')
        .upload(`profiles/${Date.now()}-${ProfilePic.originalname}`, ProfilePic.buffer, {
            contentType: ProfilePic.mimeType
        })

    if (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    const { data: publicUrl } =  supabase.storage.from("medai").getPublicUrl(data.path)

    const ImageUrl = publicUrl.publicUrl

    const user = await User.findByIdAndUpdate(req.user._id , {ProfilePic:ImageUrl} , {new:true})

       res.status(200).json({
            message: "Profile picture updated successfully",
            profilePic: user.profilePic
        });
}