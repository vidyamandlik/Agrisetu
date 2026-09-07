import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#15803d", "#f59e0b", "#0ea5e9", "#8b5cf6", "#f43f5e"];

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/analytics")
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  // Demo/mock trend + breakdown data (replace with real backend fields when available)
  const totals = stats || {
  totalListings: 0,
  totalOrders: 0,
  activeUsers: 0,
  totalOffers: 0
};
  const barData = [
  { name: "Listings", value: totals.totalListings || 0 },
  { name: "Offers", value: totals.totalOffers || 0 },
  { name: "Orders", value: totals.totalOrders || 0 },
  { name: "Users", value: totals.activeUsers || 0 },
];
  const cropSplit = [
    { name: "Onion", value: 35 },
    { name: "Tomato", value: 25 },
    { name: "Wheat", value: 20 },
    { name: "Cotton", value: 12 },
    { name: "Soybean", value: 8 },
  ];

  return (
    <div>
      <div className="page-title">📊 Analytics Dashboard</div>
      {loading && <div className="loading-text">Loading...</div>}

      {!loading && (
        <>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="value">{totals.totalListings}</div>
              <div className="label">Total Listings</div>
              <div className="stat-box">
  <div className="value">{totals.totalOffers}</div>
  <div className="label">Total Offers</div>
</div>
            </div>
            <div className="stat-box">
              <div className="value">{totals.totalOrders}</div>
              <div className="label">Total Orders</div>
            </div>
            <div className="stat-box">
              <div className="value">{totals.activeUsers}</div>
              <div className="label">Active Users</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Overview</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div className="card-title">Crop-wise Listing Split (demo data)</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={cropSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {cropSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
