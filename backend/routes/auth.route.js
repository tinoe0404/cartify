import express from 'express';
import { signup, login, logout, refreshToken, getProfile } from '../controllers/auth.controller.js';
import { get } from 'mongoose';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken); // Placeholder for refresh token 
router.get('/profile', getProfile)

export default router;