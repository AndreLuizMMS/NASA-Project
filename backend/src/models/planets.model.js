const Planets = require('./mongo/planets.mongo');

async function getAllPlanets() {
  const planets = await Planets.find({});
  return planets;
}

module.exports = {
  getAllPlanets
};
