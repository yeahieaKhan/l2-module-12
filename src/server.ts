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



// user post


// user crud
// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;


//   try {

//     const result = await pool.query(`INSERT INTO  users (name,email) VALUES ($1,$2) RETURNING *`, [name, email])
//     console.log(result.rows)
   
//     res.status(201).json({
//       success: false,
//       message: "Data inserted successfully",
//       data: result.rows,
      
//     })

//   } catch (error: any) {
//     res.status(500).json({
//       success:false,
//       message: error.message
//     })
//   }


// })


// users get

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.status(200).json({
//       success: true,
//       message: "User Reading successfully",
//       data: result.rows,
      
//     })

//   } catch (error : any) {
//     res.status(500).json({
//       success: false,
//       message:error.message
//     })
//   }

// })


// single users get api

app.get("/users/:id", async (req: Request, res: Response) => {
  try { 
    const result = await pool.query(`SELECT * FROM users WHERE id =$1 `, [req.params.id]);
    if (result.rows.length === 0) {
      res.status(400).json({
        success: false,
        message:"No data found!"
      })
    }


    else {
      res.status(200).json({
        success: true,
        massage: "User data fetched!",
        data: result.rows[0],
        
      })
    }
  }
  catch (error: any) {
    
  }
})


// Update user by ID
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // ❌ check required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET name = $1, email = $2
       WHERE id = $3
       RETURNING *`,
      [name, email, req.params.id]
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
      message: "User updated successfully",
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


// delete api

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
