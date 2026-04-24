import { useEffect, useState } from "react";
import io from "socket.io-client";
import Charts from "../components/Charts";
import Heatmap from "../components/Heatmap";

export default function Home() {
  const [validators, setValidators] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState("metrics");

  useEffect(() => {
    // ✅ FIXED URL
    const socket = io("https://validator-monitoring-dashboard.onrender.com");

    socket.on("update", (data) => {
      setValidators(data.validators);
      setMetrics(data.metrics);
      setAlerts(data.alerts || []);

      setHistory((prev) => [
        ...prev.slice(-20),
        { time: new Date().toLocaleTimeString(), tps: data.metrics.tps }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#111", color: "#fff", padding: 20 }}>
        <h2>Dashboard</h2>

        <p onClick={() => setActiveTab("validators")} style={{ cursor: "pointer" }}>
          Validators
        </p>

        <p onClick={() => setActiveTab("metrics")} style={{ cursor: "pointer" }}>
          Metrics
        </p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 20 }}>
        <h1>Validator Monitoring</h1>

        <p style={{ color: "gray" }}>Active Tab: {activeTab}</p>

        {/* Alerts */}
        {alerts.map((a, i) => (
          <div
            key={i}
            style={{
              background: a.type === "error" ? "red" : "orange",
              color: "#fff",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5
            }}
          >
            {a.message}
          </div>
        ))}

        {/* Metrics Tab */}
        {activeTab === "metrics" && (
          <div>
            <h2>Metrics</h2>

            <div style={{ display: "flex", gap: 20 }}>
              <Card title="Uptime" value={`${metrics.uptime}%`} />
              <Card title="TPS" value={metrics.tps} />
              <Card title="Latency" value={`${metrics.latency} ms`} />
            </div>

            <h3>TPS History</h3>
            <Charts data={history} />

            <h3>Latency Heatmap</h3>
            <Heatmap validators={validators} />
          </div>
        )}

        {/* Validators Tab */}
        {activeTab === "validators" && (
          <div>
            <h2>Validators</h2>

            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Latency</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((v) => (
                  <tr key={v.id}>
                    <td>{v.name}</td>
                    <td style={{ color: v.status === "active" ? "green" : "red" }}>
                      {v.status}
                    </td>
                    <td>{v.latency} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        background: "#222",
        color: "#fff",
        borderRadius: 10
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}