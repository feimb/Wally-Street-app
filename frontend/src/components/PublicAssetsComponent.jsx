import { useEffect, useState } from "react";
import { getAssets, UpdateAssets } from "../services/assetsService";
import AssetFilters from "./AssetFilters";
import AssetPagination from "./AssetPagination";

export default function PublicAssetsComponent() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [order, setOrder] = useState("");
  const [current, setCurrent] = useState(0);
  const [estadoAsset, setEstadoAsset] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [listo, setListo] = useState(false);
  const REFRESH_TIME = 3 * 60 * 1000;

  const cargarAssets = async () => {
    setNotFound(false);
    try {
      const data = await getAssets(minPrice, maxPrice, search);
      setAssets(data);
      setCurrent(0);
      setListo(true);
    } catch (error) {
      setAssets([]);
      setListo(false);
      if (error.response?.status === 404) setNotFound(true);
      else console.error(error);
    }
  };

  useEffect(() => { cargarAssets(); }, []);

  useEffect(() => {
    if (!listo) return;
    const actualizarAssets = async () => {
      try { await UpdateAssets(); } 
      catch (error) { if (error.response?.status !== 403) console.error(error); }

      try {
        const nuevos = await getAssets();
        setAssets((prevAssets) => {
          const preciosAnteriores = prevAssets.reduce((acc, a) => {
            acc[a.id] = Number(a.Precio);
            return acc;
          }, {});
          const nuevoEstado = nuevos.reduce((acc, nuevo) => {
            const anterior = preciosAnteriores[nuevo.id];
            const actual = Number(nuevo.Precio);
            acc[nuevo.id] = ((actual - anterior) / anterior) * 100;
            return acc;
          }, {});
          setEstadoAsset(nuevoEstado);
          return nuevos;
        });
      } catch (error) { console.error(error); }
    };
    const interval = setInterval(actualizarAssets, REFRESH_TIME);
    return () => clearInterval(interval);
  }, [listo]);

  const assetsFiltrados = [...assets].sort((a, b) => {
    switch (order) {
      case "asc":  return Number(a.Precio) - Number(b.Precio);
      case "desc": return Number(b.Precio) - Number(a.Precio);
      case "a-z":  return a.Nombre.localeCompare(b.Nombre, undefined, { sensitivity: "base" });
      case "z-a":  return b.Nombre.localeCompare(a.Nombre, undefined, { sensitivity: "base" });
      default:     return 0;
    }
  });

  const visibles = assetsFiltrados.slice(current, current + 3);

  return (
    <div className="max-w-6xl mx-auto mt-8 border border-green-500 rounded-2xl p-4">
      <div className="flex gap-3 items-center mb-6">
        <AssetFilters
          search={search} setSearch={setSearch}
          order={order} setOrder={setOrder}
          minPrice={minPrice} maxPrice={maxPrice}
          setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
        />
        <button onClick={cargarAssets} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </div>

      <div className="flex items-center gap-4">
        <AssetPagination side="left" current={current} setCurrent={setCurrent} total={assetsFiltrados.length} />

        {notFound ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <p className="text-gray-400 text-lg">No se encontró ningún asset.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 flex-1">
            {visibles.map((asset) => {
              const porcentaje = estadoAsset[asset.id];
              return (
                <div key={asset.id} className="border border-green-500 rounded-xl p-4 text-center bg-neutral-950">
                  <h3 className="text-3xl font-bold text-white mb-2">{asset.Nombre}</h3>
                  <p className="text-green-500 text-2xl mb-2">
                    ${Number(asset.Precio).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  {porcentaje === undefined || porcentaje === 0 ? (
                    <p className="text-gray-400 font-bold">▬ Sin cambio</p>
                  ) : porcentaje > 0 ? (
                    <p className="text-green-400 font-bold">▲ Subió</p>
                  ) : (
                    <p className="text-red-400 font-bold">▼ Bajó</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <AssetPagination side="right" current={current} setCurrent={setCurrent} total={assetsFiltrados.length} />
      </div>
    </div>
  );
}