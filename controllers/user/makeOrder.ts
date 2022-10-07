import { Response, Request } from "express";
import { Order, User } from "../../models";

let makeOrder = async (req: Request, res: Response) => {
  try {
    let { location, notes, userId } = req.body;
    let user = await User.findById(userId).populate("cart");
    if (user) {
      if ((user.cart as any)?.meals.length === 0) {
        return res.status(403).send("there is no meals");
      }

      if (user.unCompletedOrders.length >= 3) {
        return res.status(403).send("too many Un Completed Orders");
      }

      let order = await Order.create({
        userId: user._id,
        meals: (user?.cart as any).meals,
        location: location,
        notes: notes,
        status: "processing",
      });
      user.unCompletedOrders.push(order._id as any);
      await user.save();
      res.status(200).send(order);
    }
  } catch (e) {
    res.status(200).send(e);
  }
};

export default makeOrder;
