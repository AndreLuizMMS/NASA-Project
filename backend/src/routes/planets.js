const express = require('express');

const planets = require('../controllers/planets/planets.controller');
const planetsRouter = express.Router();

planetsRouter.get('/', planets.httpGetAllPlanets);

module.exports = planetsRouter;
