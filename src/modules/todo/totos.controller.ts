import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todosService } from "./todo.service";

const createTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const userCheck = await todosService.createTodoDB(user_id)

    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const result = await pool.query(
      `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
      [user_id, title]
    );

    res.status(201).json({
      success: true,
      message: "Todo created!",
      data: result.rows[0]
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


export const todosController = {
    createTodos
}

