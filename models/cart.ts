import { Schema, model, SchemaTypes } from "mongoose";

let cartSchema = new Schema({
  meals: [
    {
      _id: {
        required: true,
        type: SchemaTypes.ObjectId,
        ref: "Meal",
      },
      quantity: {
        type: Number,
        required: true,
        minlength: 1,
      },
    },
  ],
});

let Cart = model("Cart", cartSchema);

export default Cart;
