import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { genSalt } from 'bcryptjs';
import { Schema, model, SchemaTypes } from "mongoose";

let deliveryEmployeeSchema = new Schema({
  username: {
    required: [true, "please provide a username"],
    type: String,
    minlength: 4,
    maxlength: 20,
    unique : true
  },
  password: {
    required: [true, "please provide a password"],
    type: String,
    minlength: 4,
  },
  completedOrders: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Order",
    },
  ],
  unCompletedOrders: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: String,
});

deliveryEmployeeSchema.pre("save", async function name(next) {
  let d = new Date();
  this.createdAt = `${d.toTimeString().slice(0,7)}T${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});
deliveryEmployeeSchema.methods.createJWT = function () {
  return sign({ deliveryEmployeeId: this._id }, process.env.API_SECRET as string, {
    expiresIn: "30d",
  });
};
deliveryEmployeeSchema.methods.comparePasswords = async function (password: string) {
  return await compare(password, this.password);
};

let DeliveryEmployee = model("DeliveryEmployee", deliveryEmployeeSchema);

export default DeliveryEmployee;
