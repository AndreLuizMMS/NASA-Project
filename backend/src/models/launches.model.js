const Launch = require('./mongo/launches.mongo');
const Planets = require('./mongo/planets.mongo');

async function saveLaunch(launch) {
  const planetExists = await Planets.find({ keplerName: launch.target });
  if (planetExists.length < 1) {
    throw new Error(`Planet ${launch.target} doesn't exist`);
  }

  const latestFlightNumber = await getLatestLaunchNumber();
  const newLaunch = await Launch.create({
    ...launch,
    success: false,
    upcoming: true,
    flightNumber: latestFlightNumber + 1
  });
  console.log(newLaunch);
  return newLaunch;
}

async function deleteLaunch(flightNumber) {
  const launchExists = await Launch.find({ flightNumber: flightNumber });
  if (launchExists) {
    await Launch.deleteOne({ flightNumber: flightNumber });
  }

  return launchExists;
}

async function getLatestLaunchNumber() {
  const latestFlight = await Launch.findOne().sort('-flightNumber');
  if (!latestFlight) {
    // first flight
    return 1;
  }

  return latestFlight.flightNumber;
}

module.exports = { saveLaunch, deleteLaunch };
