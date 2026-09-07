import { useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card.jsx";
import Button from "../../components/Button.jsx";
import VoiceMicButton from "../../features/voice-input/VoiceMicButton.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function CreateListing() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    unit: "kg",
    quality_grade: "",
    location: "",
    expected_price: ""
  });

  const [status, setStatus] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));

  const handleVoiceResult = (text) => {
    setForm((prev) => ({
      ...prev,
      crop: text
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("saving");

    try {
      await api.post("/listings", form);

      setStatus("success");

      setForm({
        crop: "",
        quantity: "",
        unit: "kg",
        quality_grade: "",
        location: "",
        expected_price: ""
      });

    } catch (err) {
      console.error("Failed to create listing:", err);
      setStatus("error");
    }
  };

  return (
    <div>
      <h3>🌾 {t("create_listing")}</h3>

      <Card>
        <form onSubmit={handleSubmit}>

          {/* Crop */}
          <div style={{ marginBottom: "10px" }}>
            <label>{t("crop")}</label>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={form.crop}
                onChange={handleChange("crop")}
                placeholder="e.g. Onion"
                required
                style={{ flex: 1 }}
              />

              <VoiceMicButton onResult={handleVoiceResult} />
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: "10px" }}>
            <label>{t("quantity")}</label>

            <input
              type="number"
              value={form.quantity}
              onChange={handleChange("quantity")}
              placeholder="e.g. 100"
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Unit */}
          <div style={{ marginBottom: "10px" }}>
            <label>Unit</label>

            <select
              value={form.unit}
              onChange={handleChange("unit")}
              style={{ width: "100%" }}
            >
              <option value="kg">KG</option>
              <option value="quintal">Quintal</option>
              <option value="ton">Ton</option>
            </select>
          </div>

          {/* Quality */}
          <div style={{ marginBottom: "10px" }}>
            <label>Quality Grade</label>

            <input
              value={form.quality_grade}
              onChange={handleChange("quality_grade")}
              placeholder="e.g. Grade A"
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: "10px" }}>
            <label>📍 Location</label>

            <input
              value={form.location}
              onChange={handleChange("location")}
              placeholder="e.g. Kopargaon"
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Expected Price */}
          <div style={{ marginBottom: "15px" }}>
            <label>💰 Expected Price (₹)</label>

            <input
              type="number"
              value={form.expected_price}
              onChange={handleChange("expected_price")}
              placeholder="e.g. 4000"
              required
              style={{ width: "100%" }}
            />
          </div>

          <Button type="submit">
            {status === "saving" ? "Creating..." : "➕ Create Listing"}
          </Button>

          {status === "success" && (
            <p style={{ color: "green" }}>
              ✅ Listing created successfully!
            </p>
          )}

          {status === "error" && (
            <p style={{ color: "red" }}>
              ❌ Failed to create listing.
            </p>
          )}

        </form>
      </Card>
    </div>
  );
}