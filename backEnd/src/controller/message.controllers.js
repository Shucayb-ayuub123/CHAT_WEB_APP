import Message from "../model/message.js";
import User from "../model/User.js";
import supabase from "../lib/supabase.js";
export const getAllContacts = async (req, res) => {
    try {
        const loggedUserId = req.user._id
        const filterUsers = await User.find({ _id: { $ne: loggedUserId } }).select('-password')

        res.status(200).json(filterUsers)


    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server Error")

    }
}

export const getChatsByuserId = async (req, res) => {

    try {

        const myId = req.user._id
        const { id: userToChatId } = req.params


        const message = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })

        res.status(200).json(message)
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server error")
    }


}

export const sendMessage = async (req, res) => {

    try {
        const { text, image } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id
        if (!text && !image) {
             return res.status(400).json({message  : "Text or image is required"})
        }
        if (senderId.equals(recieverId)) {
             return res.status(400).json({message  : "can not send message to yourself"})
        }

        const recieverIdExist = await User.find({_id: recieverId})
        if(!recieverIdExist) {
            return res.status(400).json({message: "Receiver not found"})
        }
      
        let imageUrl

        if (image) {
            const { data, error } = await supabase.storage.from('medai').upload(`images/${Date.now()}.png`, image)

            if (error) {
                throw error
            }

            const { data: publicData } = supabase.storage.from("medai").getPublicUrl(data.path)

            imageUrl = publicData.publicUrl
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal server error")
    }
}

export const getChatpartners = async (req, res) => {


    try {
        
        const loggedUserId = req.user._id
    
        const message = await Message.find({
            $or: [{ senderId: loggedUserId }, { recieverId: loggedUserId }]
    
        })
    
        const ChatPartnetId = [...new Set(message.map((msg) =>
            msg.senderId.toString() === loggedUserId.toString() ? msg.recieverId.toString() :
                msg.senderId.toString()))]
    
        
        const ChatPartners = await User.find({_id  : {$in : ChatPartnetId}}).select('-password')

        res.status(200).json(ChatPartners)
    } catch (error) {
         console.log(error.message)
        res.status(500).json("Internal server error")
    }

}