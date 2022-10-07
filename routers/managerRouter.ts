import express from "express";
import {
  getUnCompletedOrders,
  getCompletedOrders,
  isManagerLoggedIn,
  managerLogin,
  getDeliveryEmployees,
} from "../controllers";

let router = express.Router();

router.post("/managerLogin", managerLogin);
router.post("/isLoggedIn", isManagerLoggedIn);
router.get("/orders/unCompleted", getUnCompletedOrders);
router.get("/orders/completed", getCompletedOrders);
router.get("/employees/", getDeliveryEmployees);

export default router;
