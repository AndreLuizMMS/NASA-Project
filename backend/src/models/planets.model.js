const { error } = require('console');
const { parse } = require('csv-parse');
const fs = require('fs');

const { Planet } = require('./mongo/planets.mongo');

const habitablePlanets = [];

function isHabitable(planet) {
  if (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  ) {
    return true;
  } else {
    return false;
  }
}
function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/kepler_data.csv')
      .pipe(
        parse({
          comment: '#',
          columns: true
        })
      )
      .on('data', data => {
        if (isHabitable(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', () => {
        console.log(error);
      })
      .on('end', () => {
        resolve();
      });
  });
}

function getAllPlanets() {
  console.log(habitablePlanets);
  return habitablePlanets;
}

module.exports = {
  loadPlanets,
  getAllPlanets
};
