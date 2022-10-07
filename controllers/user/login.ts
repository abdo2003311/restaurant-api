import { Response } from "express";
import { Request } from "express";
import { User } from "../../models";
let login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("err");
  }

  let user = (await User.findOne({ email: email })) as any;

  if (user) {
    let isPasswordCorrect = await user.comparePasswords(password);
    if (isPasswordCorrect) {
      const token = user.createJWT();
      res.status(200).send({ token });
    } else {
      res.status(401).send("wrong password");
    }
  } else {
    res.status(404).send("not found");
  }
};

export default login;
