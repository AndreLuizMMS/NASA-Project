const http = require('http');
const app = require('./app');

const { loadPlanets } = require('./models/planets.model');

const PORT = process.env.PORT || 3333;
const server = http.createServer(app);

async function startServer() {
  await loadPlanets();
  server.listen(PORT, () => console.log(`Running on ${PORT} `));
}
startServer();
