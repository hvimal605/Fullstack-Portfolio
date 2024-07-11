const express = require("express")

const { isauth } = require("../middlewares/auth")
const { addNewProject, upadteProject, deleteProject, getAllProject, getSingleProject } = require("../controller/project")



const router = express.Router()

router.post('/add',isauth,addNewProject)
router.delete('/delete/:id',isauth,deleteProject )
router.put('/update/:id',isauth,upadteProject)
router.get('/getAll',getAllProject)
router.get('/get/:id',getSingleProject)

module.exports = router