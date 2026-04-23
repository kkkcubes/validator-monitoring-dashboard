const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const validatorRoutes = require('./src/routes/validatorRoute');
const socketHandler = require("./sockets/socketHandler");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json());
app.use("/api/validators", validatorRoutes);
app.use("/api/auth", authRoutes);

socketHandler(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});