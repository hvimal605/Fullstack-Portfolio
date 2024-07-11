const express = require("express")
const { postTimeline, deleteTimeline, getAllTimeline } = require("../controller/timeline")
const { isauth } = require("../middlewares/auth")


const router = express.Router()

router.post('/add',isauth,postTimeline)
router.delete('/delete/:id',isauth,deleteTimeline) 
router.get('/getAll',getAllTimeline) 
module.exports = router