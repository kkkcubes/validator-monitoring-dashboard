const {
  getValidators,
  getNetworkMetrics
} = require("../src/services/blockchainService");

const { checkAlerts } = require("../src/services/alertService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    const interval = setInterval(async () => {
      try {
        const validators = await getValidators();
        const metrics = await getNetworkMetrics();
        const alerts = checkAlerts(validators);

        socket.emit("update", { validators, metrics, alerts });
      } catch (error) {
        console.error("Error in socket update:", error);
      }
    }, 3000);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval); // 🔥 prevent memory leaks
    });
  });
};