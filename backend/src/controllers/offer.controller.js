const Offer = require("../models/Offer");

exports.create = async (req, res) => {
  try {
    const result = await Offer.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getByListing = async (req, res) => {
  try {
    const result = await Offer.findByListing(req.params.listingId);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};