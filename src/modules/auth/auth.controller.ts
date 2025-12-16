import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { pool } from "../../config/database";

const registerUser = async (req: Request, res: Response) => {
  // const { name, email,password } = req.body;
  try {
    const result = await authServices.registerUser(req.body);
    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.signIn(email, password);

    res.status(200).json({
      success: true,
      message: "User Login Successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  registerUser,
  signIn,
};
