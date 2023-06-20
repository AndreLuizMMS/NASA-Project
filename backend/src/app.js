const path = require('path');

const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const app = express();
const api_v1 = require('./routes/api_v1');
const planetsRouter = require('./routes/planets');

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(morgan('combined'));

app.use(express.json()); // formats to JSON
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api_v1);
app.use('/v1/planets', planetsRouter);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
