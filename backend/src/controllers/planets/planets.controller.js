const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

const planets = { httpGetAllPlanets };
module.exports = planets;
