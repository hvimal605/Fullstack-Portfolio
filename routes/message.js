const express = require("express")
const { sendMessage, getAllMessages, deleteMessage } = require("../controller/message")
const { isauth } = require("../middlewares/auth")
const router = express.Router()

router.post('/send',sendMessage)
router.get('/getall',getAllMessages)
router.delete('/delete/:id', isauth,deleteMessage)


module.exports = router