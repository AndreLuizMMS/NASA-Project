require('dotenv').config();
const mogodb_password = process.env.mogodb_password;
const mogodb_user = process.env.mogodb_user;

const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 2323;
const MONGO_URL = `mongodb+srv://${mogodb_user}:${mogodb_password}@nasa-mission-control.lckppke.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.on('error', error => {
  console.log(error);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/ `));
}

startServer();
