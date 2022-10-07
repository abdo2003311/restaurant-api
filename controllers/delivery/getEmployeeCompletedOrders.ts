import { Response, Request } from "express";
import { DeliveryEmployee } from "../../models";

let getEmployeeCompletedOrders = async (req: Request, res: Response) => {
  try {
    let id = req.body.deliveryEmployeeId;
    let employee = await DeliveryEmployee.findById(id).populate('completedOrders');
    res.status(200).send(employee?.completedOrders);
  } catch (e) {
    res.status(200).send("error");
  }
};

export default getEmployeeCompletedOrders;
