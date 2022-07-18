const ratesRouter = require('express').Router();
const { Rate } = require('../../db/models/index');

ratesRouter.get('/rates', async (req, res) => {
  try {
    const series = { MORTGAGE30US: [], MORTGAGE15US: [], MORTGAGE5US: [] };
    await Rate.findAll().then((rates) => {
      const seriesKeys = Object.keys(series);
      for (let i = 0; i < seriesKeys.length; i++) {
        for (let y = 0; y < rates.length; y++) {
          if (seriesKeys[i] === rates[y].series)
            series[seriesKeys[i]].push(rates[y]);
        }
      }
      res.status(200).send({ series });
    });
  } catch {
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = {
  ratesRouter,
};
