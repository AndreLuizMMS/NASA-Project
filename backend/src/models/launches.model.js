// const { Launch } = require('./mongo/launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Mission 2012',
  rocket: 'Deds 023',
  launchDate: new Date('June 17, 2030,'),
  target: 'Kepler 420 B',
  customers: ['DEDS', 'PUC'],
  upcoming: true,
  success: false
};

// const launchesMock = [
//   {
//     flightNumber: 100,
//     mission: 'Kepler Mission 2012',
//     rocket: 'Deds 023',
//     launchDate: new Date('June 17, 2030'),
//     target: 'Kepler 420 B',
//     customers: ['DEDS', 'PUC'],
//     upcoming: true,
//     success: false
//   },
//   {
//     flightNumber: 101,
//     mission: 'Apollo 11',
//     rocket: 'Saturn V',
//     launchDate: new Date('July 16, 1969'),
//     target: 'Moon',
//     customers: ['NASA'],
//     upcoming: false,
//     success: true
//   },
//   {
//     flightNumber: 102,
//     mission: 'Mars Rover Mission',
//     rocket: 'Falcon Heavy',
//     launchDate: new Date('November 26, 2025'),
//     target: 'Mars',
//     customers: ['NASA', 'SpaceX'],
//     upcoming: false,
//     success: true
//   }
//   // Add the remaining 7 mock data objects here...
// ];

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
