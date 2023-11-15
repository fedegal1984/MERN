const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const authRequired = ((req,res,next)=>{
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "no hay token, autorización denegada"})
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
        if(err) res.status(400).json({message: "token inválido"})
        req.user = user
        next()
    })
})

module.exports = {authRequired}