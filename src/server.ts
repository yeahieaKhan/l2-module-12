import express, { Request, Response } from "express";
import { Pool } from "pg";
const app = express()
const port = 5000;
//cookie parser
app.use(express.json());

// form data handing
// app.use(express.urlencoded());


const pool = new Pool({
  connectionString: `postgresql://
    neondb_owner:npg_hvOm29VlBFxM@ep-crimson-thunder-aig08dr7-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
});



const initDB = async () => {
  await pool.query(`
    CREATE TABLE IS NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(1500) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    )
    `

  )
}


initDB();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Form next level!')
})

app.post("/", (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({
        success: true,
        message: "API is working",
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
