import express from "express";
import {
  addToCart,
  authUser,
  deleteUser,
  getUser,
  getUserCart,
  getUserOrders,
  isLoggedIn,
  login,
  makeOrder,
  register,
  updateUser,
} from "../controllers";

let router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/isLoggedIn", isLoggedIn);
router.post("/user/makeOrder", authUser, makeOrder);
router.post("/user/addToCart", authUser, addToCart);
router.get("/user", authUser, getUser);
router.get("/user/orders", authUser, getUserOrders);
router.get("/user/cart", authUser, getUserCart);
router.put("/user", authUser, updateUser);
router.delete("/user", authUser, deleteUser);
export default router;
