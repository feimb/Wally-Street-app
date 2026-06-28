import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AssetHistoryCard({
  historial,
  nombre,
  onClose,
}) {
  if (!historial) return null;

  if (historial.length === 0) {
    return (
      <div className="mt-8 border border-green-500 rounded-xl p-6 bg-neutral-950">
        <div className="flex justify-between">
          <h2 className="text-2xl text-white">
            Historial de {nombre}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500"
          >
            X
          </button>
        </div>

        <p className="text-gray-400 mt-5">
          Este asset todavía no posee historial.
        </p>
      </div>
    );
  }

  const datos = historial.map((h) => ({
    fecha: h.transaction_date.substring(5, 16),
    precio: Number(h.precio),
  })).reverse();

  return (
    <div className="mt-8 border border-green-500 rounded-xl p-6 bg-neutral-950">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl text-white">
          Historial de {nombre}
        </h2>

        <button
          onClick={onClose}
          className="text-red-500"
        >
          X
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="precio"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}