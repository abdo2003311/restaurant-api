import express from "express";
import {
  getUnCompletedOrders,
  getCompletedOrders,
  isManagerLoggedIn,
  managerLogin,
  getDeliveryEmployees,
  authManager,
} from "../controllers";

let router = express.Router();

router.post("/managerLogin", managerLogin);
router.post("/isLoggedIn", isManagerLoggedIn);
router.get("/orders/unCompleted", authManager, getUnCompletedOrders);
router.get("/orders/completed", authManager, getCompletedOrders);
router.get("/employees/", authManager, getDeliveryEmployees);

export default router;
