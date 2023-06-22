const Launches = require('../../models/mongo/launches.mongo');
const { saveLaunch, deleteLaunch } = require('../../models/launches.model');

const httpGetAllLaunches = async (req, res) => {
  const launches = await Launches.find({});
  return res.status(200).json(launches);
};

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
    addedLaunch = await saveLaunch(launch);
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
}

const launches = { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch };
module.exports = launches;
