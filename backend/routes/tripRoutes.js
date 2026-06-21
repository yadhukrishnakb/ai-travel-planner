const express = require("express");

const router = express.Router();


const tripController = require("../controllers/tripController");

const authMiddleware = require("../middleware/auth");



// Create new AI trip

router.post(
    "/",
    authMiddleware,
    tripController.createTrip
);



// Get logged-in user's trips

router.get(
    "/",
    authMiddleware,
    tripController.getTrips
);



// Update trip (itinerary / packing updates)

router.put(
    "/:id",
    authMiddleware,
    tripController.updateTrip
);



module.exports = router;