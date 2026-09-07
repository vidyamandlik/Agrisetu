import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Card from "../../components/Card.jsx";
import Button from "../../components/Button.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function BrowseListings() {
  const { t } = useLanguage();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/listings")
      .then((res) => setListings(res.data))
      .catch((err) => console.error("Failed to load listings:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>🛒 {t("browse_listings")}</h3>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Browse available farmer produce and connect directly with farmers.
      </p>

      {loading && <p>Loading available produce...</p>}

      {!loading && listings.length === 0 && (
        <p>No listings available.</p>
      )}

      {listings.map((listing) => (
        <Card key={listing.id} title={`🌾 ${listing.crop}`}>
          
          <p>
            📦 <strong>{t("quantity")}:</strong>{" "}
            {listing.quantity} {listing.unit}
          </p>

          <p>
            ⭐ <strong>Quality:</strong>{" "}
            {listing.quality_grade || "N/A"}
          </p>

          <p>
            📍 <strong>Location:</strong>{" "}
            {listing.location || "N/A"}
          </p>

          <p>
            💰 <strong>Expected Price:</strong>{" "}
            ₹{listing.expected_price || "Not specified"}
          </p>

          <p style={{ color: "green", fontWeight: "bold" }}>
            🟢 Available
          </p>

          <Link
            to={`/buyer/offer/${listing.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button>
              💰 {t("make_offer")}
            </Button>
          </Link>

        </Card>
      ))}
    </div>
  );
}