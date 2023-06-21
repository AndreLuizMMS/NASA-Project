const Planets = require('./mongo/planets.mongo');

async function getAllPlanets() {
  const planets = await Planets.find({}, { _id: 0, __v: 0 });
  return planets;
}

module.exports = {
  getAllPlanets
};
