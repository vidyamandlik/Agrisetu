import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import WeatherWidget from "../../components/WeatherWidget.jsx";
import VoiceSearch from "../../components/VoiceSearch.jsx";

export default function Dashboard() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPrices()
      .then((data) => setPrices(data.slice(0, 5)))
      .catch(() => setPrices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-title">डॅशबोर्ड</div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
      <Link to="/farmer/offers">
  <button className="btn-primary" style={{ background: "#16a34a" }}>
    💰 आलेल्या ऑफर्स
  </button>
</Link>
        <Link to="/farmer/create-listing"><button className="btn-primary">➕ लिस्टिंग तयार करा</button></Link>
        <Link to="/farmer/price-trend"><button className="btn-primary" style={{ background: "#f59e0b" }}>📈 किंमत कल पहा</button></Link>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">मॉडेल किंमत (Latest Prices)</div>
          {loading && <div className="loading-text">Loading...</div>}
          {!loading && prices.length === 0 && (
            <div className="loading-text">अजून price data उपलब्ध नाही.</div>
          )}
          {!loading && prices.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={{ padding: "8px 4px" }}>Crop</th>
                  <th style={{ padding: "8px 4px" }}>Price (₹)</th>
                  <th style={{ padding: "8px 4px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 4px" }}>{p.crop}</td>
                    <td style={{ padding: "8px 4px" }}>₹{p.price}</td>
                    <td style={{ padding: "8px 4px" }}>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <WeatherWidget />
          <VoiceSearch />
        </div>
      </div>
    </div>
  );
}
