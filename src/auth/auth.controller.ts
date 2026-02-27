import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User login fail",
    });
  }
};

export const authController = {
  loginUser,
};
