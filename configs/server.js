"use strict"

import express from 'express'
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"

import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'


const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}


const routes = (app) => {
    app.use("/adoptionSystem/v1/auth", authRoutes)
    app.use("/adoptionSystem/v1/auth", userRouter)

}


const connectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}


export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        connectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}