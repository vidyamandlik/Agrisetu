const express = require("express");

const router = express.Router();

const offerController = require("../controllers/offer.controller");

router.post("/", offerController.create);

router.get("/listing/:listingId", offerController.getByListing);

module.exports = router;