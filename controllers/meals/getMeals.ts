import { Response, Request } from "express";
import { Meal } from "../../models";

let getMeals = async (req: Request, res: Response) => {
  let meals = await Meal.find();
  res.status(200).send(meals);
};

export default getMeals;
