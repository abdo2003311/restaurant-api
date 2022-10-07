import { Order } from "../../models";
import { Response, Request } from "express";

let getOrders = async (req: Request, res: Response) => {
  try {
    let orders = await Order.find({ status: { $ne: "completed" } });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default getOrders;
