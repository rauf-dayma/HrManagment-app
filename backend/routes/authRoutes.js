import express from 'express';
import { login, register } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post("/register", register, authMiddleware);
router.post('/login', login);

export default router;