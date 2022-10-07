import { Schema, model } from "mongoose";

let mealSchema = new Schema({
  title: {
    required: true,
    type: String,
    minlength: 7,
  },
  desc: { required: true, type: String, minlength: 7, maxlength: 150 },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  img: {
    required: true,
    type: String,
  },
  rate: {
    default : 0,
    type: Number,
    min: 0,
    max: 5,
  },
});

let Meal = model("Meal", mealSchema);

export default Meal;
