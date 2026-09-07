import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing.jsx";
import Dashboard from "../pages/farmer/Dashboard.jsx";
import CreateListing from "../pages/farmer/CreateListing.jsx";
import PriceTrend from "../pages/farmer/PriceTrend.jsx";
import ReceivedOffers from "../pages/farmer/ReceivedOffers.jsx";
import BrowseListings from "../pages/buyer/BrowseListings.jsx";
import MakeOffer from "../pages/buyer/MakeOffer.jsx";
import OrderHistory from "../pages/buyer/OrderHistory.jsx";
import AnalyticsDashboard from "../pages/admin/AnalyticsDashboard.jsx";
import DisputePanel from "../pages/admin/DisputePanel.jsx";
import DataFeedMonitor from "../pages/admin/DataFeedMonitor.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/farmer/dashboard" element={<Dashboard />} />
      <Route path="/farmer/create-listing" element={<CreateListing />} />
      <Route path="/farmer/price-trend" element={<PriceTrend />} />
      <Route path="/farmer/offers" element={<ReceivedOffers />} />
      <Route path="/buyer/listings" element={<BrowseListings />} />
      <Route path="/buyer/offer/:listingId" element={<MakeOffer />} />
      <Route path="/buyer/orders" element={<OrderHistory />} />
      <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
      <Route path="/admin/disputes" element={<DisputePanel />} />
      <Route path="/admin/data-feed" element={<DataFeedMonitor />} />
    </Routes>
  );
}
