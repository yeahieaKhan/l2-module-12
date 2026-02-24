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


const getUsers =   async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUserDB();
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

}


const getSingleUser = async (req: Request, res: Response) => {
  try { 
    const result = await userServices.getSingleUserDB(req.params.id as string);
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
}


export const userController = {
  createUser,
  getUsers,
  getSingleUser
}