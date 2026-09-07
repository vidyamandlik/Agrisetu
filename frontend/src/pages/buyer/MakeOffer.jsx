import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Card from "../../components/Card.jsx";
import Button from "../../components/Button.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function MakeOffer() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [offerPrice, setOfferPrice] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await api.post("/offers", {
        listing_id: listingId,
        buyer_id: 2,
        offer_price: offerPrice
      });
      setStatus("success");
      setTimeout(() => navigate("/buyer/listings"), 1200);
    } catch (err) {
      console.error("Failed to submit offer:", err);
      setStatus("error");
    }
  };

  return (
    <div>
      <h3>{t("make_offer")}</h3>
      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Offer Price</label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              style={{ width: "100%" }}
              required
            />
          </div>
          <Button type="submit">{t("submit")}</Button>
          {status === "success" && <p style={{ color: "green" }}>Offer submitted!</p>}
          {status === "error" && <p style={{ color: "red" }}>Failed to submit offer.</p>}
        </form>
      </Card>
    </div>
  );
}
