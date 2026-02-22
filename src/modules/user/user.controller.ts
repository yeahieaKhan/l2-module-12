import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser =  async (req: Request, res: Response) => {
  const { name, email } = req.body;


  try {

      const result = await userServices.createUserDB(name,email)
      

    console.log(result.rows)
   
    res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: result.rows,
      
    })

  } catch (error: any) {
    res.status(500).json({
      success:false,
      message: error.message
    })
  }


}

export const userController = {
    createUser
}