const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Mission 2012',
  rocket: 'Deds 023',
  launchDate: new Date('June 17, 2030,'),
  target: 'Kepler 420 B',
  customer: ['DEDS', 'PUC'],
  upcoming: true,
  success: false
};

launches.set(launch.flightNumber, launch);

function validLaunchId(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: false
    })
  );
}

function deleteLaunchById(id) {
  const deletedLaunch = launches.get(Number(id));

  deletedLaunch.success = false;
  deletedLaunch.upcoming = false;

  return deletedLaunch;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
  validLaunchId
};
