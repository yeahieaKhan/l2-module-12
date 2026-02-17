import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv"
import path from "path"
import { error } from "console";

//env config

dotenv.config({path:path.join(process.cwd(), ".env")})

const app = express()
const port = 5000;
//cookie parser
app.use(express.json());

// form data handing
// app.use(express.urlencoded());


const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`
});



const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(1500) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `
  );

  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(2500) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

  
}


initDB();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Form next level!')
})



// user crud
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;


  try {

    const result = await pool.query(`INSERT INTO  users (name,email) VALUES ($1,$2) RETURNING *`, [name, email])
    console.log(result.rows)
   
    res.status(201).json({
      success: false,
      message: "Data inserted successfully",
      data: result.rows,
      
    })

  } catch (error: any) {
    res.status(500).json({
      success:false,
      message: error.message
    })
  }


})


app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "User Reading successfully",
      data: result.rows,
      
    })

  } catch (error : any) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }

})


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







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
