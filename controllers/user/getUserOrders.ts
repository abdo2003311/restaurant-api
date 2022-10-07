import { Response } from "express";
import { Request } from "express";
import { User } from "../../models";

let getUserOrders = async (req: Request, res: Response) => {
  try {
    let { userId } = req.body;
    let user = await User.findById(userId).populate([
      "unCompletedOrders",
      "completedOrders",
    ]);
    if (user)
      res.status(200).send({
        completedOrders: user.completedOrders,
        unCompletedOrders: user.unCompletedOrders,
      });
  } catch (err: any) {
    res.status(500).send("err");
  }
};

export default getUserOrders;
