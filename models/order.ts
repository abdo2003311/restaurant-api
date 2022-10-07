import { Schema, model, SchemaTypes } from "mongoose";

let orderSchema = new Schema({
  userId: {
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
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
  notes: String,
  location: String,
  status: String,
});

let Order = model("Order", orderSchema);

export default Order;
