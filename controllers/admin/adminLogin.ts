import { Response } from "express";
import { Request } from "express";
import { sign } from "jsonwebtoken";
let managerLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("err");
  }

  if (username === "admin" && password === "admin") {
    let token = sign(
      {
        username: "admin",
        password: "admin",
      },
      process.env.API_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).send({ token });
  } else {
    return res.status(403).send("unAuth");
  }
};

export default managerLogin;
