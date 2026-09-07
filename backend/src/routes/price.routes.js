const express = require("express");
const router = express.Router();
const priceController = require("../controllers/price.controller");

router.get("/", priceController.getAll);
router.get("/live", priceController.getLivePrices);
router.get("/advisory", priceController.getAdvisory);
router.get("/forecast", priceController.getForecast);

module.exports = router;
