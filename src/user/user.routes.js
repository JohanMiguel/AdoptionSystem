import { Router } from "express";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator } from "../middlewares/check-validator.js";
import { getUserById, getUsers, deleteUser, updatePassword } from "./user.controller.js";

const router = Router()
router.get("/findUser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsers)
/*Ruta para eliminar por ID*/
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)
/*Ruta para actualizar por Id */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)


export default router