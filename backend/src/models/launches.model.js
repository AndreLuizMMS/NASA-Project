const launches = new Map();

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

module.exports = {
  launches
};
