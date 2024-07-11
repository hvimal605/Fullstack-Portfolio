const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { dbconnect } = require('./config/database')
const messageRouter = require('./routes/message')
const userRouter = require('./routes/user')
const timelineRouter = require('./routes/timeline')
const SoftwareApplicationRouter = require('./routes/softwareApplication')
const SkillRouter = require('./routes/skill')
const ProjectRouter = require('./routes/project')
const { cloudinaryConnect } = require('./config/cloudinary')



const app = express()
require("dotenv").config()
const PORT = 3000 || process.env.PORT

app.use(
    cors({
        origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}
))

cloudinaryConnect()
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/timeline", timelineRouter)
app.use("/api/v1/softwareApplication", SoftwareApplicationRouter)
app.use("/api/v1/skill", SkillRouter)
app.use("/api/v1/project", ProjectRouter)
dbconnect()







app.listen(PORT, () => {
    console.log(` server listening at part ${PORT}`);

})