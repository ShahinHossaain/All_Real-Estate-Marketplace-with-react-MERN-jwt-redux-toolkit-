import express from 'express';
import { say } from '../controllers/user.controller.js';

const router = express.Router();


router.get('/say', say)

export default router;