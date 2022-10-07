import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
let authEmployee = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("err");
  }
  const token = authHeader?.split(" ")[1];
  if (token) {
    try {
      const payload: any = verify(token, process.env.API_SECRET as string);
      req.body.deliveryEmployeeId = payload.deliveryEmployeeId;
      next();
    } catch (error) {
      res.status(404).send('error');
    }
  }
};

export default authEmployee;
