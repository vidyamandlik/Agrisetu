const DATASET_ID = "9ef84268-d588-465a-a308-a864a43d0070";

async function getMandiPrices(crop, state = "Maharashtra") {
  const apiKey = process.env.DATA_GOV_API_KEY;

  if (!apiKey) {
    throw new Error("DATA_GOV_API_KEY is missing from .env");
  }

const url =
  `https://api.data.gov.in/resource/${DATASET_ID}` +
  `?api-key=${apiKey}` +
  `&format=json` +
  `&limit=10` +
  `&filters[state]=${encodeURIComponent(state)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Government API error: ${response.status}`);
  }

  const data = await response.json();
console.log("Mandi records count:", data.records?.length);
console.log(
  "Commodities returned:",
  data.records.map((record) => record.commodity)
);

return data.records || [];
}

module.exports = { getMandiPrices };