const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

function createAccessToken(payload){
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"}, (err, token)=>{
            if(err){
                reject
            }else{
                resolve(token)
                
            }
        })
    })
}

module.exports = {createAccessToken}