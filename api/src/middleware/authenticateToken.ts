import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export default async function authToken(req: any, res: any, next: NextFunction){
  // Option 1
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer Token

  // Option 2
  const token = req.header("x-auth-token");

  // If token not found, send error message
  try {
    if (!token) {
      res.status(401).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }
    
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    }else{
      console.log("Unexpected Error", err);
    }
  }

  // Authenticate token
  try {
    const user:any = await jwt.verify(token, 'SECRET');
    req.user = user.email;
    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};
