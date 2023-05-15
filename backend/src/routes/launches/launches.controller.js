const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
  validLaunchId
} = require('../../models/launches.model');

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

function httpPostNewLaunch(req, res) {
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
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const id = req.params.id;

  if (validLaunchId(id)) {
    return res.status(400).json({
      error: 'Invalid launch id'
    });
  } else {
    deleteLaunchById(id);
    res.status(201).json({ deleted: id });
  }
}

module.exports = { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch };
