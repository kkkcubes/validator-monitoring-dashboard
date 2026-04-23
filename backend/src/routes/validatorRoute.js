const express = require("express");
const router = express.Router();
const {
  getValidators,
  getNetworkMetrics
} = require("../services/blockchainService");

router.get("/", async (req, res) => {
  const data = await getValidators();
  res.json(data);
});

router.get("/metrics", async (req, res) => {
  const data = await getNetworkMetrics();
  res.json(data);
});

module.exports = router;