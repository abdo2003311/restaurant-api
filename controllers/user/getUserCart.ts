import { Response, Request } from "express";
import { User } from "../../models";

let getUserCart = async (req: Request, res: Response) => {
  try {
    let id = req.body.userId;
    let user = await User.findById(id).populate("cart");
    if (user?.cart) {
      res.status(200).send(user?.cart);
    } else res.status(200).send({ meals: [] });
  } catch (e) {
    res.status(200).send("error");
  }
};

export default getUserCart;
