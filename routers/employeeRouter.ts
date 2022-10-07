import express from "express";
import {
  authEmployee,
  deliveryLogin,
  getEmployeeCompletedOrders,
  getEmployeeUnCompletedOrders,
  isEmployeeLoggedIn,
} from "../controllers";

let router = express.Router();

router.post("/login", deliveryLogin);
router.get("/orders/completed", authEmployee, getEmployeeCompletedOrders);
router.get("/orders/unCompleted", authEmployee, getEmployeeUnCompletedOrders);
router.post("/isLoggedIn", isEmployeeLoggedIn);

export default router;
