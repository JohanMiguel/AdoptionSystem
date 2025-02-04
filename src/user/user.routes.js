import { Router } from "express";
import { getUserByIdValidator } from "../middlewares/check-validator.js";
import { getUserById, getUsers } from "./user.controller.js";

const router = Router()
router.get("/findUser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsers)
export default router