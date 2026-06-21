const express = require("express");

const router = express.Router();


const tripController = require("../controllers/tripController");

const authMiddleware = require("../middleware/auth");




// Create trip

router.post(

    "/",

    authMiddleware,

    tripController.createTrip

);




// Get trips

router.get(

    "/",

    authMiddleware,

    tripController.getTrips

);




// Update trip

router.put(

    "/:id",

    authMiddleware,

    tripController.updateTrip

);




// Delete trip

router.delete(

    "/:id",

    authMiddleware,

    tripController.deleteTrip

);



module.exports = router;