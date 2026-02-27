import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser =  async (req: Request, res: Response) => {
  


  try {

      const result = await userServices.createUserDB(req.body)
      

    console.log(result.rows)
   
    res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: result.rows,
      
    })

  } catch (error: any) {
    res.status(500).json({
      success:false,
      message: "Something went rwong"
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



//get single user list

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


// update single user


const updateSingleUser =  async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;


    const result = await userServices.updateSingleUserDB(name, email, req.params.id);
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
}

const deleteSingleUser =  async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const result = await userServices.deleteSingleUserBD(userId as string);

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
}













export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser
  
}