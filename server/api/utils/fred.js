const Fred = require('fred-api');
const { Rate } = require('../../db/models/index');
require('dotenv').config();

const api_key = process.env.FRED_API_KEY;
const fred = new Fred(api_key);

const series = {
  MORTGAGE30US: [],
  MORTGAGE15US: [],
  MORTGAGE5US: [],
};

const fetchRate = (serie) => {
  return new Promise((resolve, reject) => {
    try {
      fred.getSeriesObservations({ series_id: serie }, (e, result) => {
        resolve(result.observations);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const fetchRates = async () => {
  const seriesKeys = Object.keys(series);
  const promises = [];
  seriesKeys.forEach((seriesKey) => {
    const data = fetchRate(seriesKey);
    promises.push(data);
  });

  // Await for all promises (rates from FRED) to resolve, then add series as a key-value pair to each object within each series
  return Promise.all(promises).then((rates) => {
    rates.forEach((rate, i) => {
      rate.forEach((r) => {
        const value = r;
        value.series = seriesKeys[i];
      });
      series[seriesKeys[i]] = rate;
    });
    return series;
  });
};

// Push all rates data into Rate table in database using bulkCreate
fetchRates().then((res) => {
  const rates = Object.values(res);
  const promises = [];
  for (let i = 0; i < rates.length; i++) {
    promises.push(
      Rate.bulkCreate(rates[i], {
        fields: ['id', 'date', 'value', 'series'],
      })
    );
  }

  try {
    return Promise.all(promises).then((r) => r);
  } catch (e) {
    return res.status(500).send({ message: 'Server error' });
  }
});
