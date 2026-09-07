const mandiService = require("./mandiService");

// Simple linear regression forecast
function forecastPrices(history, days = 7) {
  if (!history.length) return [];

  const n = history.length;
  const xs = history.map((_, i) => i);
  const ys = history.map((p) => Number(p.price));

  const xMean = xs.reduce((a, b) => a + b, 0) / n;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;

  for (let i = 0; i < n; i++) {
    num += (xs[i] - xMean) * (ys[i] - yMean);
    den += (xs[i] - xMean) ** 2;
  }

  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  const forecast = [];

  for (let i = 1; i <= days; i++) {
    const predicted = intercept + slope * (n - 1 + i);

    forecast.push({
      date: `Day ${i}`,
      price: Math.max(0, Math.round(predicted)),
      predicted: true
    });
  }

  return forecast;
}


async function getForecastData(crop) {

  // Get live mandi prices
  const records = await mandiService.getMandiPrices(crop);

  if (!records || records.length === 0) {
    throw new Error(`No mandi price data found for ${crop}`);
  }

  // IMPORTANT: Keep only the EXACT commodity selected
  const filteredRecords = records.filter(
    (record) =>
      record.commodity &&
      record.commodity.toLowerCase() === crop.toLowerCase()
  );

  if (filteredRecords.length === 0) {
    throw new Error(`No exact mandi price data found for ${crop}`);
  }

  // Use modal prices from different markets
  const history = filteredRecords.slice(0, 10).map((record, index) => ({
    date: record.market.trim(),
    price: Number(record.modal_price),
    predicted: false
  }));

  // Current average price
  const averagePrice =
    history.reduce((sum, item) => sum + item.price, 0) / history.length;

  // Create a simple stable forecast around the current average
  const forecast = [];

  for (let i = 1; i <= 7; i++) {
    const variation = (Math.random() - 0.5) * averagePrice * 0.08;

    forecast.push({
      date: `Forecast ${i}`,
      price: Math.round(averagePrice + variation),
      predicted: true
    });
  }

  return {
    history,
    forecast
  };
}


module.exports = {
  forecastPrices,
  getForecastData
};