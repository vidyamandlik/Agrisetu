const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Something went wrong" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

// Generic axios-style methods (many pages use api.get(...).then(res => res.data))
async function get(path) {
  const data = await request(path);
  return { data };
}

async function post(path, body) {
  const data = await request(path, { method: "POST", body: JSON.stringify(body) });
  return { data };
}

export const api = {
  get,
  post,
  getPrices: () => request("/prices"),
  getLivePrices: (crop) =>request(`/prices/live?crop=${encodeURIComponent(crop)}`),
  getForecast: (crop) => request(`/prices/forecast?crop=${encodeURIComponent(crop)}`),
  getAdvisory: (crop) => request(`/prices/advisory?crop=${encodeURIComponent(crop)}`),
  getListings: () => request("/listings"),
  createListing: (data) => request("/listings", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) })
};

export default api;
