const pool = require("../config/db");

exports.getAnalytics = async (req, res) => {
  try {
    const listingsResult = await pool.query(
      "SELECT COUNT(*) FROM listings"
    );

    const ordersResult = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const usersResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const offersResult = await pool.query(
      "SELECT COUNT(*) FROM offers"
    );

    res.json({
      totalListings: Number(listingsResult.rows[0].count),
      totalOrders: Number(ordersResult.rows[0].count),
      activeUsers: Number(usersResult.rows[0].count),
      totalOffers: Number(offersResult.rows[0].count)
    });

  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: err.message });
  }
};