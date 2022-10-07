import { Response, Request } from "express";
import { Model } from "mongoose";
import { Order } from "../../models";

let updateOrder = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { status } = req.body;
    let order = await Order.findById(id);
    order!.status = status;
    await order?.save();
    res.status(200).send("success");
  } catch (e) {
    res.status(200).send("error");
  }
};

export default updateOrder;
