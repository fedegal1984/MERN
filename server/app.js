/* Las importaciones */
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const sessionRouter = require('./routers/sessionRouter.js')
const postRouter = require("./routers/postRouter.js")
const cookieParser = require("cookie-parser")

/* Configuraciones */
dotenv.config()
const mongoose = require('./config/dbConfig.js')

const app = express()
const PORT = process.env.PORT || 8080

/* Middleweres */
app.use(cors())
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


/* Routers */
app.use("/user", sessionRouter)
app.use("/posts", postRouter)


app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en: http://localhost:${PORT}/`)
})