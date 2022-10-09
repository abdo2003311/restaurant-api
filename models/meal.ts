import { Schema, model } from "mongoose";

let mealSchema = new Schema({
  title: {
    required: true,
    type: String,
    minlength: 5,
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
    default: 0,
    type: Number,
    min: 0,
    max: 5,
  },
  sold: {
    default: 0,
    type: Number,
    min: 0,
  },
  createdAt: String,
});

mealSchema.pre('save', async function name(next) {
  let d = new Date();
  this.createdAt = `${d.toTimeString().slice(0,7)}T${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  next();
});
let Meal = model("Meal", mealSchema);

export default Meal;
