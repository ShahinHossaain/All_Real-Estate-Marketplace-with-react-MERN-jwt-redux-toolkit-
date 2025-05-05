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
// router.get('/add', async (req, res) => {
//     const listings = await Listing.aggregate([
//         {
//             $addFields: {
//                 finalPrice: { $subtract: ["$regularPrice", "$discountPrice"] }
//             }
//         }
//     ]);

//     const bulkOps = listings.map(listing => ({
//         updateOne: {
//             filter: { _id: listing._id },
//             update: { $set: { finalPrice: listing.finalPrice } }
//         }
//     }));

//     await Listing.bulkWrite(bulkOps);

//     res.status(200).json({ message: 'Listings updated successfully!' });

// });
// router.get('/remove', async (req, res) => {
//     await Listing.updateMany({}, { $unset: { finalPrice: "" } });
//     res.status(200).json({ message: 'Listings updated successfully!' });
// });




export default router;