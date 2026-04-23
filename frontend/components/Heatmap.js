export default function Heatmap({ validators }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {validators.map((v) => {
        let color =
          v.latency < 150 ? "green" :
          v.latency < 250 ? "orange" : "red";

        return (
          <div
            key={v.id}
            style={{
              width: 60,
              height: 60,
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff"
            }}
          >
            {v.name}
          </div>
        );
      })}
    </div>
  );
}