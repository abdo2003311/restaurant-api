import { Request, Response } from "express";
import { DeliveryEmployee } from "../../models";

let getDeliveryEmployees = async (req: Request, res: Response) => {
  try {
    let employees = await DeliveryEmployee.find();
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default getDeliveryEmployees;
