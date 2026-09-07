const Price = require("../models/Price");
const forecastService = require("../services/forecastService");
const mandiService = require("../services/mandiService");

exports.getAll = async (req, res) => {
  try {
    const result = await Price.findAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdvisory = async (req, res) => {
  const { crop } = req.query;
  res.json({ crop, message: `${crop} sathi sध्या bazar bhaव sthir aahe. Puढील aठवड्यात vaढण्याची shakyata.` });
};

exports.getForecast = async (req, res) => {
  try {
    const { crop } = req.query;
    if (!crop) return res.status(400).json({ error: "crop query param required" });
    const data = await forecastService.getForecastData(crop);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getLivePrices = async (req, res) => {
  try {
    const crop = req.query.crop;

    if (!crop) {
      return res.status(400).json({
        error: "Please provide a crop name"
      });
    }

    const prices = await mandiService.getMandiPrices(crop);

    res.json(prices);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};