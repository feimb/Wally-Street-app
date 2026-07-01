import { useState, useEffect } from "react";
import { getTransactions } from "../services/transactionsService";
import useAuth from "../hooks/useAuth";

export default function TransactionsComponent() {
  const { logout } = useAuth(); 
  const [asset, setAsset] = useState(null);
  const [type, setType] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [availableAssets, setAvailableAssets] = useState([]);
  const [pagina, setPagina] = useState(1);
  const POR_PAGINA = 6;
  const totalPaginas = Math.ceil(transactions.length / POR_PAGINA);
  const transaccionesPagina = transactions.slice(
    (pagina - 1) * POR_PAGINA,
    pagina * POR_PAGINA
  );

  const buscar = async (assetParam = asset, typeParam = type) => {
    try {
      const data = await getTransactions(assetParam, typeParam);
      setTransactions(data);
      setPagina(1);
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    buscar("", "").then((data) => {
      if (data) {
        const mapaAssets = new Map();
        data.forEach((t) => { // t de transactions
          if (!mapaAssets.has(t.assed_id)) {
            mapaAssets.set(t.assed_id, t.asset);
          }
        });
        setAvailableAssets([...mapaAssets.entries()]);
      }
    });
  }, []);

  return (
    <div className="bg-black border border-green-500 rounded-xl p-4 text-white">
      <h2 className="text-2xl mb-4">Mis operaciones</h2>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400">ASSET</label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="">Todos</option>
            {availableAssets.map(([id, nombre]) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400">TIPO</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="">Todos</option>
            <option value="buy">Compra</option>
            <option value="sell">Venta</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => buscar(asset, type)}
        className="mt-3 bg-gray-800 rounded-lg px-4 py-2"
      >
        Buscar
      </button>

      <div className="mt-5">
        {transaccionesPagina.map((t) => (
          <div
            key={t.id}
            className="flex justify-between border-b border-gray-800 py-3"
          >
            <div>
              <p className="font-medium">{t.asset}</p>
              <p className="text-xs text-gray-500">{t.transaction_date}</p>
              <p className="text-xs text-gray-500">
                {t.quantity} unidades x precio individual ${t.price_per_unit} c/u
              </p>
            </div>

            <div className="text-right">
              <p>${t.total_amount}</p>
              <span
                className={
                  t.transaction_type === "buy"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {t.transaction_type === "buy" ? "Compra" : "Venta"} 
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
            className="px-3 py-1 bg-gray-800 rounded-lg disabled:opacity-30"
          >
            ← Anterior
          </button>
          <span>{pagina} / {totalPaginas}</span>
          <button
            onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
            disabled={pagina === totalPaginas}
            className="px-3 py-1 bg-gray-800 rounded-lg disabled:opacity-30"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}