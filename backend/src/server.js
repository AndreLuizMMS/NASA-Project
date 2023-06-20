const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanets } = require('./models/planets.model');

const PORT = process.env.PORT || 2323;
const MONGO_URL =
  'mongodb+srv://AndreLuizMMS:85197300andre@nasa-mission-control.lckppke.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDb connection ready!');
});

mongoose.connection.on('error', error => {
  console.error('Error: ', error);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await loadPlanets();
  server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/ `));
}

startServer();
