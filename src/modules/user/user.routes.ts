import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", userController.createUser)

router.get("/", userController.getUsers)
router.get("/:id",userController.getSingleUser)
router.put("/:id",userController.updateSingleUser)
router.delete("/:id",userController.deleteSingleUser)


export const userRoutes = router;