import express from 'express';
import { signup, login, logout, refreshToken, getProfile } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken); // Placeholder for refresh token 
router.get("/profile", protectRoute, getProfile);

export default router;