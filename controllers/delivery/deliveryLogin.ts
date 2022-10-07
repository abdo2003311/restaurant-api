import { Response } from "express";
import { Request } from "express";
import { DeliveryEmployee } from "../../models";
let deliveryLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("err");
  }

  let employee = (await DeliveryEmployee.findOne({ username: username })) as any;

  if (employee) {
    let isPasswordCorrect = await employee.comparePasswords(password);
    if (isPasswordCorrect) {
      const token = employee.createJWT();
      res.status(200).send({ token });
    } else {
      res.status(401).send("wrong password");
    }
  } else {
    res.status(404).send("not found");
  }
};

export default deliveryLogin;
