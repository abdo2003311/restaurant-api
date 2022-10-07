import { Response, Request } from "express";
import { User } from "../../models";

let deleteUser = async (req: Request, res: Response) => {
  try {
    let id = req.body.userId;
    await User.findByIdAndDelete(id);
    res.status(200).send("success");
  } catch (e) {
    res.status(200).send("error");
  }
};

export default deleteUser;
