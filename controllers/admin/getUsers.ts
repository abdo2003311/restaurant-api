import { Response, Request } from "express";
import { User } from "../../models";

let getUsers = async (req: Request, res: Response) => {
  let users = await User.find();
  res.status(200).send(users);
};

export default getUsers;
