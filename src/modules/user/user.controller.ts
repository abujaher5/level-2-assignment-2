import { Request, Response } from "express";

import { userServices } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = req.user!;

    if (user.role === "customer") {
      const result = await userServices.userUpdateOwnProfile(req.body, user.id);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "User Profile Updated Successfully..",
          data: result.rows[0],
        });
      }
    }

    if (user.role === "admin") {
      const result = await userServices.adminUpdateUser(
        req.body,
        userId as string
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "User Updated Successfully..",
          data: result.rows[0],
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User has active booking status..",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully..",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const userControllers = {
  // createUser,
  getUser,
  // adminUpdateUser,
  // userUpdateOwnProfile,
  updateUserInfo,
  deleteUser,
};
