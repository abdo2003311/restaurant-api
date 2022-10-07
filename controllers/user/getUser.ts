import { Response, Request } from "express";
import { User } from "../../models";

let getUser = async (req: Request, res: Response) => {
  try {
    let id = req.body.userId;
    let user = await User.findById(id);
    res.status(200).send({
      username: user?.username,
    });
  } catch (e) {
    res.status(200).send("error");
  }
};

export default getUser;
