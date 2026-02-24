import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";

import { error } from "console";
import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import {  userRoutes } from "./modules/user/user.routes";
import { todosRouter } from "./modules/todo/todos.routes";

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





app.use("/users/:id",userRoutes);



//todos crud

app.use("/todos",todosRouter );





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
