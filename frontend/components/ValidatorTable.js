export default function ValidatorTable({ validators }) {
  return (
    <table className="w-full text-left border">
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
            <td className={v.status === "active" ? "text-green-500" : "text-red-500"}>
              {v.status}
            </td>
            <td>{v.latency} ms</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}