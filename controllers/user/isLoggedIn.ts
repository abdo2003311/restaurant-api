import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../../models";
let isLoggedIn = async (req: Request, res: Response) => {
  try {
    let { token } = req.body;
    verify(
      token,
      process.env.API_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) return res.status(500).send(err);
        let user = await User.findById(decoded.userId);
        if (user) res.status(200).send("auth");
        else res.status(403).send("unauth");
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }
};

export default isLoggedIn;
