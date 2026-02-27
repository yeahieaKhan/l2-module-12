import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";

import { error } from "console";
import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRouter } from "./modules/todo/todos.routes";
import { authRouters } from "./auth/auth.routes";

//env config

const app = express();
const port = config.port;
//cookie parser
app.use(express.json());

// form data handing
// app.use(express.urlencoded());

initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World Form next level!");
});

app.use("/users", userRoutes);
app.use("/users", userRoutes);
app.get("/users/:id", userRoutes);
app.put("/users/:id", userRoutes);
app.use("/users/:id", userRoutes);

//todos crud

app.use("/todos", todosRouter);
app.get("/todos", todosRouter);

// auth router

app.use("/", authRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
