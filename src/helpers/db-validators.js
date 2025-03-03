import User from "../user/user.model.js"
 
export const existeEmail = async(email= '') =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El Email ${email} ya fue registrado`)
    }
}


export const existeUsername = async(username= '') =>{
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El username ${username} ya fue registrado`)
    }
}

export const userExists = async(uid= '') =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("El usuario no existe en la Base de Datos")
    }
}

