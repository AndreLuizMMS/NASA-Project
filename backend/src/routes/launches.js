const express = require('express');

const launchesRouter = express.Router();
const launchesController = require('../controllers/launches/launches.controller');

launchesRouter.get('/', launchesController.httpGetAllLaunches);
launchesRouter.post('/', launchesController.httpPostNewLaunch);
launchesRouter.delete('/:id', launchesController.httpDeleteLaunch);

module.exports = launchesRouter;
