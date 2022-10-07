import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Cart, Meal, User } from "../../models";

let addToCart = async (req: Request, res: Response) => {
  try {
    let { meal, userId } = req.body;
    let mealExsits = await Meal.findById(meal._id);
    if (mealExsits) {
      let user = await User.findById(userId);
      let cart = await Cart.findById(user?.cart);
      let mealExsitsInCart = cart?.meals.filter((cartMeal) => {
        if (mealExsits) {
          return (
            (cartMeal._id as ObjectId).toString() == mealExsits._id.toString()
          );
        }
      });
      console.log(mealExsitsInCart);
      if (mealExsitsInCart?.length !== 0)
        return res.status(403).send("already exists in cart");
      cart?.meals.push(meal);
      await cart?.save();
      res.status(201).send("done !");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("err");
  }
};

export default addToCart;
