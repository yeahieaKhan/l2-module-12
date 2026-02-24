import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";

import { error } from "console";
import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import {  userRoutes } from "./modules/user/user.routes";

//env config



const app = express()
const port = config.port;
//cookie parser
app.use(express.json());

// form data handing
// app.use(express.urlencoded());




initDB();




app.get('/',logger, (req: Request, res: Response) => {
  res.send('Hello World Form next level!')
})



app.use("/users", userRoutes)
app.use("/users", userRoutes)
app.get("/users/:id", userRoutes)
app.put("/users/:id", userRoutes);





app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [userId]
    );

    // ❌ user not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ success response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    // 🔴 server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});



//todos crud


app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`, [user_id, title]);
    res.status(201).json({
      success: true,
      message: "Todo created!",
      data: result.rows[0]
    })
   } catch (error) {
    
  }
})





app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      message: "todos Reading successfully",
      data: result.rows,
      
    })

  } catch (error : any) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }

})










app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
