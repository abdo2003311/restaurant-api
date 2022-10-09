import { sign } from "jsonwebtoken";
import { compare, compareSync, genSalt, hash } from "bcryptjs";
import { Schema, model, SchemaTypes } from "mongoose";

let userSchema = new Schema({
  username: {
    required: [true, "please provide a username"],
    type: String,
    minlength: 4,
    maxlength: 20,
  },
  password: {
    required: [true, "please provide a password"],
    type: String,
    minlength: 4,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
    minlength: 10,
    maxlength: 50,
    match: [
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      "please provide a valid email",
    ],
  },
  unCompletedOrders: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Order",
    },
  ],
  completedOrders: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Order",
    },
  ],
  cart: {
    type: SchemaTypes.ObjectId,
    ref: "Cart",
  },
  createdAt: String,
});
userSchema.pre("save", async function name(next) {
  let d = new Date();
  this.createdAt = `${d.toTimeString().slice(0,7)}T${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});
userSchema.methods.createJWT = function () {
  return sign({ userId: this._id }, process.env.API_SECRET as string, {
    expiresIn: "30d",
  });
};
userSchema.methods.comparePasswords = async function (password: string) {
  return await compare(password, this.password);
};
let User = model("User", userSchema);

export default User;
