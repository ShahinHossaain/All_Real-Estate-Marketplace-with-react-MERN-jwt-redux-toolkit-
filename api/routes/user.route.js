import express from 'express';
import { deleteUser, getUser, signOut, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utilitis/verifyUser.js';

const router = express.Router();


router.get('/signout', verifyToken, signOut);
router.get('/:id', getUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;