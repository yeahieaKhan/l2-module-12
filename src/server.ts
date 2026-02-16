import express, { Request, Response } from "express";
const app = express()
const port = 5000;


//cookie parser
app.use(express.json());

// form data handing
// app.use(express.urlencoded());

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
