import express from 'express';
import { say, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utilitis/verifyUser.js';

const router = express.Router();


router.get('/say', say);
router.post('/update/id', verifyToken, updateUser);

export default router;