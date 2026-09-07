import { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card.jsx";

export default function ReceivedOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // For prototype: checking offers for Listing ID 1
  const listingId = 1;

  useEffect(() => {
    api
      .get(`/offers/listing/${listingId}`)
      .then((res) => setOffers(res.data))
      .catch((err) => {
        console.error("Failed to load offers:", err);
        setOffers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-title">💰 आलेल्या ऑफर्स</div>

      {loading && <p>Loading offers...</p>}

      {!loading && offers.length === 0 && (
        <p>अजून कोणतीही ऑफर आलेली नाही.</p>
      )}

      {offers.map((offer) => (
        <Card key={offer.id} title={`Offer #${offer.id}`}>
          <p>
            <strong>Offer Price:</strong> ₹{offer.offer_price}
          </p>

          <p>
            <strong>Status:</strong> {offer.status}
          </p>

          <p>
            <strong>Received:</strong>{" "}
            {new Date(offer.created_at).toLocaleString()}
          </p>
        </Card>
      ))}
    </div>
  );
}