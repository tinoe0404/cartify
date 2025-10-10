import express from "express";
import {createProduct,
        deleteProduct,
        getAllProducts,
        getFeaturedProducts,
        getRecommendedProducts,
        getProductsByCategory,
        toggleFeaturedProduct
     } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("recommendations", getRecommendedProducts);
routes.post("/", protectRoute, adminRoute, createProduct);
routes.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)
routes.delete("/:id", protectRoute, adminRoute, deleteProduct)

export default router;