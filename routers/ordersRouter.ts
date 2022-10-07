import express from "express";
import { makeOrder } from "../controllers";

let router = express.Router();

router.post('/', makeOrder);

export default router;