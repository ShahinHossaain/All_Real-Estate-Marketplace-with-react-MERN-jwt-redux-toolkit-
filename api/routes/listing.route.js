import express from 'express';
import { verifyToken } from '../utilitis/verifyUser.js';
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/listing.controller.js';
import Listing from '../models/listing.model.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.patch('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);




export default router;