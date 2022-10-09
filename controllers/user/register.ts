import { Response, Request } from "express";
import StatusCodes from "http-status-codes";
import { Cart, User } from "../../models";

let register = async (req: Request, res: Response) => {
  try {
    let { username, password, email } = req.body;
    let cart = await Cart.create({ meals: [] });
    let user = (await User.create({
      username: username,
      password: password,
      email: email,
      cart: cart._id,
    })) as any;
    let token = user.createJWT();
    res.status(StatusCodes.CREATED).send({ token });
  } catch (e: any) {
    res.status(500).send(e);
  }
};

export default register;
