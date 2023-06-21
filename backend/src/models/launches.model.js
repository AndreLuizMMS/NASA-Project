const Launch = require('./mongo/launches.mongo');

async function saveLaunch(launch) {
  const launchExists = await Launch.find({ flightNumber: launch.flightNumber });

  if (launchExists.length < 1) {
    await Launch.create({ ...launch, upcoming: true, success: false });
  }
  await Launch.updateOne({ flightNumber: launch.flightNumber }, { launch });
  return launchExists;
}

async function deleteLaunch(flightNumber) {
  const launchExists = await Launch.find({ flightNumber: flightNumber });

  if (launchExists) {
    await Launch.deleteOne({ flightNumber: flightNumber });
  }

  return launchExists;
}

module.exports = { saveLaunch, deleteLaunch };
