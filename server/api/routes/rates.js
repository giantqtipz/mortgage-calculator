const ratesRouter = require('express').Router();

const { Rate } = require('../../db/models/index');

ratesRouter.get('/rates', async (req, res) => {
  try {
    await Rate.findAll().then((rates) => res.status(200).send({ rates }));
  } catch {
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = {
  ratesRouter,
};
