const {createUser, login, logout, profile} = require("../dao/controllers/userController")
const express = require("express")
const {authRequired} = require("../config/validateToken")


const sessionRouter = express.Router()


sessionRouter.post("/register", createUser)

sessionRouter.post("/login", login)

sessionRouter.post("/logout", logout)

sessionRouter.get("/profile", authRequired, profile)

module.exports = sessionRouter