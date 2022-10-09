import { Response, Request } from "express";
import { Meal } from "../../models";

let getAdminMeals = async (req: Request, res: Response) => {
  let meals = await Meal.find();
  res.status(200).send(meals);
};

export default getAdminMeals;
