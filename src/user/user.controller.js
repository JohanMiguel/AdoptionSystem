import { hash } from "argon2"
import User from "./user.model.js"

export const getUserById = async(req, res) => {
    try{
        const { uid } = req.params
        const usser = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                sucess: false,
                message : "el usuarioo no existe",
                error: err.message 
            })
        }

        return res.status(200).json({
            sucess: true,
            user
        })
    }catch(err){
        return res.status(500).json({
            sucess: false,
            message : "Error al obtener el usuario",
            error: err.message
        })
    }
}



export const getUsers = async (req, res) => {
    try{
        const { limit =3, from = 0} = req.query
        const query = {status: true}

        const [ total, user] = await Promise.all([
            User.counDocumnets(query),
            User.find(query)
            .sckip(Number(from))
            .limit(Number(limits))
        ])

        return res.status(200).json({
            sucess: true,
            total, 
            user

        })
    }catch(err){
        return res.status(500).json({
            sucess: false,
            message : "Error al obtener el usuario",
            error: err.message
    })
}
}


/*Funcion para eliminar un usuario */
export const deleteUser = async (req, res) => {
    try{
        const { uid } = req. params

        const user =  await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario Eliminado",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}


/*Para Actualizar la PASSWOD */
export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encryptedPassword})
        return res.status(200).json({
            sucess: true,
            message: "Contrasenia actualizada"
        })
    }catch(err){
        return res.status(500).json({
            sucess: false,
            message : "Error al actualizar la password",
            error: err.message
    })
}
    
}