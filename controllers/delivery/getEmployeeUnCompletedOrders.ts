import { Response, Request } from "express";
import { DeliveryEmployee } from "../../models";

let getEmployeeUnCompletedOrders = async (req: Request, res: Response) => {
  try {
    let id = req.body.deliveryEmployeeId;
    let employee = await DeliveryEmployee.findById(id).populate('unCompletedOrders');
    console.log(employee?.unCompletedOrders)
    res.status(200).send(employee?.unCompletedOrders);
  } catch (e) {
    res.status(200).send("error");
  }
};

export default getEmployeeUnCompletedOrders;
