import express from "express";
import {
  getDeliveryEmployees,
  adminLogin,
  isAdminLoggedIn,
  createMeal,
  deleteMeal,
  createEmployee,
  updateMeal,
  authAdmin,
  getOrders,
  getMeals,
  getUsers,
  updateEmployee,
  deleteEmployee,
} from "../controllers";

let router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/isLoggedIn", isAdminLoggedIn);
router.post("/meals", authAdmin, createMeal);
router.get("/meals", authAdmin, getMeals);
router.get("/users", authAdmin, getUsers);
router.delete("/meals/:id", authAdmin, deleteMeal);
router.put("/meals/:id", authAdmin, updateMeal);
router.post("/employees/", authAdmin, createEmployee);
router.delete("/employees/:id", authAdmin, deleteEmployee);
router.put("/employees/:id", authAdmin, updateEmployee);
router.get("/orders/", authAdmin, getOrders);
router.get("/employees/", authAdmin, getDeliveryEmployees);

export default router;
