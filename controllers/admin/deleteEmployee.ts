import { Response, Request } from "express";
import { DeliveryEmployee } from "../../models";

let deleteEmployee = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    await DeliveryEmployee.findByIdAndDelete(id);
    res.status(200).send("success");
  } catch (e) {
    res.status(200).send("error");
  }
};

export default deleteEmployee;
