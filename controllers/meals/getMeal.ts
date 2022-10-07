import { Response, Request } from "express";
import { Meal } from "../../models";

let getMeal = async (req: Request, res: Response) => {

  try {
    let meal = await Meal.findById(req.params.id);
    res.status(200).send(meal);
  
  } catch (error) {
    res.status(500).send(error)
  }
};

export default getMeal;
