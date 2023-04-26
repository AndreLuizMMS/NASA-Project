const path = require('path');

const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(morgan('combined'));

app.use(express.json()); // formats to JSON
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter); // handle routing from '/planets'
app.use(launchesRouter); // handle routing from '/launches'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
