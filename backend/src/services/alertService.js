const checkAlerts = (validators) => {
  const alerts = [];

  validators.forEach(v => {
    if (v.status === "banned") {
      alerts.push(`${v.name} is banned`);
    }
    if (v.latency > 250) {
      alerts.push(`${v.name} high latency`);
    }
  });

  return alerts;
};

module.exports = { checkAlerts };