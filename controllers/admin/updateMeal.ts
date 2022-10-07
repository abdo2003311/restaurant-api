import { Response, Request } from "express";
import { Meal } from "../../models";

let updateMeal = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { newMeal } = req.body;
    let meal = await Meal.findById(id);
    meal = newMeal;
    await meal?.save();
    res.status(200).send("success");
  } catch (e) {
    res.status(200).send("error");
  }
};

export default updateMeal;
