import { Response, Request } from "express";
import { Order } from "../../models";

let getOrders = async (req: Request, res: Response) => {
  let orders = await Order.find();
  res.status(200).send(orders);
};

export default getOrders;
