const Message = require("../models/message")

exports.sendMessage = async (req, res) => {
    try {
        const { senderName, subject, message } = req.body;
        if (!senderName || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details"
            })
        }

        const data = await Message.create({ senderName, subject, message })
        res.status(200).json({
            success: true,
            message: "Message Sent",
            data
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error "
        })

    }
}

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(201).json({
            success: true,
            message: "all messages fetched successfully",
            messages
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error "
        })



    }
}



exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndDelete(id)
        if(!message){
            return res.json({
                message:"message already deleted or message not exist "
            })
        }
        res.status(200).json({
            success: true,
            message: `message delete successfully `,

        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error "
        })



    }
}


