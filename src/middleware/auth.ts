import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/database";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqHeaders = req.headers.authorization;
      const token = reqHeaders?.split(" ")[1];

      if (!token) {
        return res.status(500).json({
          message: "You are not allowed!! ",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      req.user = decoded;

      const user = await pool.query(
        `
   
  SELECT * FROM users WHERE email=$1
  `,
        [decoded.email]
      );
      // console.log("decoded", decoded);
      // console.log("decoded role", decoded.role);
      if (user.rows.length === 0) {
        throw new Error("User not found!!");
      }
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          error: "unauthorized !!",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
