const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(express.json()); // formats to JSON
app.use(planetsRouter); // handle routing from '/planets'

module.exports = app;
