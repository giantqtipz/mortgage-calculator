const ratesRouter = require('express').Router();

const { Rates } = require('../../db/models/index');

ratesRouter.get('/rates', async (req, res) => {
  try {
    await Rates.findAll().then((rates) => res.status(200).send({ rates }));
  } catch {
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = {
  ratesRouter,
};
