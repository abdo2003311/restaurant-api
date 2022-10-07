import { Response, Request } from "express";
import { User } from "../../models";

let updateUser = async (req: Request, res: Response) => {
  try {
    let id = req.body.userId;
    let { newUser } = req.body;
    let user = await User.findById(id);
    user = newUser;
    await user?.save();
    res.status(200).send("success");
  } catch (e) {
    res.status(200).send("error");
  }
};

export default updateUser;
