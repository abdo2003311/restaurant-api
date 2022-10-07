import { Response, Request } from "express";
import { Meal } from "../../models";

let deleteMeal = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    await Meal.findByIdAndDelete(id);
    res.status(200).send("success");
  } catch (e) {
    res.status(200).send("error");
  }
};

export default deleteMeal;
