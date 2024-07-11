const express = require("express")
const { addSkill, deleteSkill, updateSkill, getAllSkill } = require("../controller/skill")
const { isauth } = require("../middlewares/auth")



const router = express.Router()

router.post('/add',isauth,addSkill)
router.delete('/delete/:id',isauth, deleteSkill)
router.put('/update/:id',isauth,updateSkill)
router.get('/getAll',getAllSkill)

module.exports = router