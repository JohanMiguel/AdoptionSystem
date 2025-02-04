import User from "../user/user.model.js"
import { hash } from "argon2"

export const register = async(req, res) =>{
    try{
        const data = req.body
        /*El operador terniario = ?*/
        let profilePicture = req.file ? req.file.filename: null
        const encryptedPassword = await hash(data.password)
       
        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const user = await User.create(data)
        console.log("Hello ")
 
        return res.status(201).json({
            message: "User has been registered",
            name: user.name,
            email: user.email
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        })
    }
}
 
export const login = async(req, res) =>{
    const  {email, username, password} = req.body
    try{
        const user = await User.findOne({
            $or: [{email: email}, {username: username}]
        })
 
        if(!user){
            return res.status(404).json({
                message: "Las credenciales son invalidas",
                error: "El username o email no existe en la base de datos"
            })
        }
 
        const validPassword = await verify(user.password, password)
       
        if(!validPassword){
            return res.status(400).json({
                message: "Las Credenciales invalidas",
                error: "La Constraseña incorrecta"
            })
        }
 
        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "Inicio de cesion fue exitoso",
            userDetails:{
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al iniciar de sesión",
            error: err.message
        })
    }
}