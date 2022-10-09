import { Response, Request } from "express";
import { DeliveryEmployee } from "../../models";

let createEmployee = async (req: Request, res: Response) => {
  try {
    let { employee } = req.body;
    let newEmployee = await DeliveryEmployee.create(employee)
    res.status(200).send(newEmployee);
  } catch (e) {
    res.status(403).send(e);
  }
};

export default createEmployee;
