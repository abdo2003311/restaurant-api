import { Response, Request } from "express";
import { Meal } from "../../models";

let createMeal = async (req: Request, res: Response) => {
  try {
    let { meal } = req.body;
    let newMeal = await Meal.create(meal)
    res.status(200).send(newMeal);
  } catch (e) {
    res.status(200).send("error");
  }
};

export default createMeal;
