const Launches = require('../../models/mongo/launches.mongo');
const { saveLaunch, deleteLaunch } = require('../../models/launches.model');

const httpGetAllLaunches = async (req, res) => {
  const launches = await Launches.find({});
  return res.status(200).json(launches);
};

async function httpPostNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.launchDate || !launch.rocket || !launch.mission || !launch.target) {
    return res.status(400).json({
      error: 'Missing launch data'
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date'
    });
  }
  await saveLaunch(launch);
  return res.status(201).json(launch);
}

async function httpDeleteLaunch(req, res) {
  const id = req.params.id;

  await deleteLaunch(id);
  res.status(201).json({ deleted: id });
}

const launches = { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch };

module.exports = launches;
