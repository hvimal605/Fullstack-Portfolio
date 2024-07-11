const express = require("express")

const { addNewApplication, deleteApplication, getAllSoftwareApplication } = require("../controller/softwareApplication")
const { isauth } = require("../middlewares/auth")


const router = express.Router()

router.post('/add',isauth,addNewApplication)
router.delete('/delete/:id',isauth,deleteApplication)
router.get('/getAll',getAllSoftwareApplication)

module.exports = router