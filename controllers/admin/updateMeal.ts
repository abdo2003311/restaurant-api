import { Response, Request } from "express";
import { Meal } from "../../models";

let updateMeal = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { newMeal } = req.body;
    let meal = await Meal.findById(id);
    if (meal) {
      meal.desc = newMeal.desc;
      meal.title = newMeal.title;
      meal.price = newMeal.price;
    }
    await meal?.save();
    res.status(200).send(meal);
  } catch (e) {
    res.status(403).send(e);
  }
};

export default updateMeal;
