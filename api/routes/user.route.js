import express from 'express';
import { deleteUser, getUser, getUserListings, signOut, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utilitis/verifyUser.js';

const router = express.Router();


router.get('/signout', verifyToken, signOut);
router.get('/:id', verifyToken, getUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);

export default router;