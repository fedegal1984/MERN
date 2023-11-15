const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const {createAccessToken} = require("../../config/jwtConfig")

const createUser = async (req, res) =>{
    const {email, password, alias} = req.body
    const emailExistente = await User.findOne({email})

    if(emailExistente){
        return res.status(404).json({ok: false, error: "el email ya está registrado"})
    }else{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, password: hashedPassword, alias})
        await newUser.save()
        const token = await createAccessToken({id: newUser._id})
        res.cookie("token", token)
        res.json({id: newUser._id, email: newUser.email, alias: newUser.alias})
    }
}


const login = async (req, res) =>{
    const {email, password} = req.body
    try{
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({message: "email no válido"})
        const compararPassword = await bcrypt.compare(password, userFound.password)
        if(!compararPassword) return res.status(400).json({message: "contraseña inválida"})
        const token = await createAccessToken({id: userFound._id })
        res.cookie("token", token)
        res.json({id: userFound._id, email: userFound.email, alias: userFound.alias})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
} 

const logout = (req, res) =>{
    res.cookie("token", "", {expires: new Date(0)})
    return res.sendStatus(200)
}

const profile = async (req, res)=>{
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "usuario no encontrado"})
    return res.json({id: userFound._id, email: userFound.email, alias: userFound.alias})
}
module.exports = {createUser, login, logout, profile}