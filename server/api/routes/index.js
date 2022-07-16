const { app } = require('../server');
const { ratesRouter } = require('./rates');

const routes = [ratesRouter];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
