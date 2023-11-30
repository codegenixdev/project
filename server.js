const jsonServer = require("json-server");
const express = require("express");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(next, 500);
});
server.use(router);

const app = express();
app.use(server);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on...");
});
