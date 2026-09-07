const Listing = require("../models/Listing");

exports.create = async (req, res) => {
  try {
    const result = await Listing.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Listing.findAll();
    res.json(result.rows);
  } catch (err) {
  console.error("GET LISTINGS ERROR:", err);
  res.status(500).json({
    error: err.message,
    details: err
  });
}
};
