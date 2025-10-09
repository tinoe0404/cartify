import express from "express";
import { getAllProducts } from "../controllers/product.controller";
import { protectRoute } from "../controllers/middleware/auth.middleware";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);

export default router;