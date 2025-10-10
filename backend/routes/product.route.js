import express from "express";
import {createProduct,
        deleteProduct,
        getAllProducts,
        getFeaturedProducts,
     } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("featured", getFeaturedProducts);
routes.post("/", protectRoute, adminRoute, createProduct);
routes.delete("/:id", protectRoute, adminRoute, deleteProduct)

export default router;