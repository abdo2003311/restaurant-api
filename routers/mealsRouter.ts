import express from "express";
import { deleteMeal, getMeal, getMeals, updateMeal } from "../controllers";

let router = express.Router();

router.get('/', getMeals);
router.get('/:id', getMeal);
router.delete('/:id', deleteMeal);
router.put('/:id', updateMeal);

export default router;