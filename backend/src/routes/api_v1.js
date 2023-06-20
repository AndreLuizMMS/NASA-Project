const express = require('express');

const api_v1 = express.Router();
const planetsRouter = require('./planets');
const launchesRouter = require('./launches');

api_v1.get('/', (req, res) => {
  return res.status(200).json({
    connection: 'ok'
  });
});

api_v1.use('/launches', launchesRouter);
api_v1.use('/planets', planetsRouter);

module.exports = api_v1;
