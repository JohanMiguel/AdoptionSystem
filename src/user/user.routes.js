import { Router } from "express";
import { getUserByIdValidator } from "../middlewares/check-validator";
import { getUserById, getUsers } from "./user.controller";

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsers)
export default router