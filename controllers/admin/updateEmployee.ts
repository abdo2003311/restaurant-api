import { Response, Request } from "express";
import { DeliveryEmployee } from "../../models";

let updateEmployee = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { newEmployee } = req.body;
    let employee = await DeliveryEmployee.findById(id);
    if (employee) {
      employee.username = newEmployee.username;
      employee.password = newEmployee.password;
    }
    await employee?.save();
    res.status(200).send(employee);
  } catch (e) {
    res.status(403).send(e);
  }
};

export default updateEmployee;
