const {
  saveClientLaunch,
  deleteLaunch,
  getAllLaunches
} = require('../../models/launches.model');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpPostNewLaunch(req, res) {
  const launch = req.body;
  if (!launchIsValid(launch)) {
    return res.status(400).json({ error: 'Missing launch data' });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date'
    });
  }

  let addedLaunch;
  try {
    addedLaunch = await saveClientLaunch(launch);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

  return res.status(201).json({ ok: true, addedLaunch });
}

async function httpDeleteLaunch(req, res) {
  const id = req.params.id;
  await deleteLaunch(id);

  res.status(201).json({ deleted: id });
}

function launchIsValid(launch) {
  if (!launch.launchDate || !launch.rocket || !launch.mission || !launch.target) {
    return false;
  }
  return true;
}

const launches = { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch };
module.exports = launches;
