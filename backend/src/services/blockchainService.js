// Replace with real GenLayer RPC later

const getValidators = async () => {
  return [
    { id: 1, name: "Validator A", status: "active", latency: 120 },
    { id: 2, name: "Validator B", status: "banned", latency: 300 }
  ];
};

const getNetworkMetrics = async () => {
  return {
    uptime: 99.98,
    tps: 1200,
    latency: 150
  };
};

module.exports = { getValidators, getNetworkMetrics };