const axios = require('axios');

const Launch = require('./mongo/launches.mongo');
const Planets = require('./mongo/planets.mongo');

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

// stores on monogoDB from client
async function saveClientLaunch(launch) {
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

async function saveSpacexLaunch(launch) {
  if (launchExists(launch)) {
    const newLaunch = await Launch.create(launch);
    console.log('Launch added');
    return newLaunch;
  }
}

async function deleteLaunch(flightNumber) {
  const launchExists = await Launch.find({ flightNumber });
  if (launchExists) {
    await Launch.deleteOne({ flightNumber });
  }

  return launchExists;
}

async function getAllLaunches(skip, limit) {
  return await Launch.find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function getLatestLaunchNumber() {
  const latestFlight = await Launch.findOne().sort('-flightNumber');
  if (!latestFlight) {
    // first flight
    return 1;
  }

  return latestFlight.flightNumber;
}

async function populateLaunches() {
  console.log('Fetching from SpaceX');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: ['rocket', 'payloads']
    }
  });

  const launchDocs = response.data.docs;
  console.log('Fetched !');

  launchDocs.forEach(async launchDoc => {
    const payloads = launchDoc.payloads;
    const customers = payloads.flatMap(payload => {
      return payload.customers;
    });

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      customers: customers,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success
    };

    const exists = await launchExists(launch);
    if (!exists) {
      await saveSpacexLaunch(launch);
    }
  });
}

async function launchExists(filter) {
  const launch = await Launch.findOne(filter);
  if (launch == null) {
    return false;
  } else {
    return true;
  }
}

module.exports = { saveClientLaunch, deleteLaunch, populateLaunches, getAllLaunches };
