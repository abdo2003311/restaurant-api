import { NextFunction } from "express";
import { Response, Request } from "express";
import { verify } from "jsonwebtoken";

let authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("err");
    }
    const token = authHeader?.split(" ")[1];
    if (token)
      verify(
        token,
        process.env.API_SECRET as string,
        async (err: any, decoded: any) => {
          if (decoded.username === "admin" && decoded.password === "admin")
            next();
          else res.status(403).send("unAuth");
        }
      );
  } catch (e) {
    res.status(403).send("unAuth");
  }
};

export default authAdmin;
