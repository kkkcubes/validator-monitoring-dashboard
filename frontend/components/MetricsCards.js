export default function MetricsCards({ metrics }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-gray-800 text-white rounded">
        Uptime: {metrics.uptime}%
      </div>
      <div className="p-4 bg-gray-800 text-white rounded">
        TPS: {metrics.tps}
      </div>
      <div className="p-4 bg-gray-800 text-white rounded">
        Latency: {metrics.latency} ms
      </div>
    </div>
  );
}