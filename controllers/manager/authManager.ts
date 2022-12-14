import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
let authManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("err");
    }
    const token = authHeader?.split(" ")[1];
    if (token)
      return verify(
        token,
        process.env.API_SECRET as string,
        async (err: any, decoded: any) => {
          if (decoded.username === "manager" && decoded.password === "manager")
          next()
          else return res.status(403).send('unAuth');
        }
      );
  } catch (e) {
    return false;
  }
};

export default authManager;
