import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { todosController } from "./totos.controller";

const router = express.Router();


router.post("/",todosController.createTodos)




export const todosRouter = router;

