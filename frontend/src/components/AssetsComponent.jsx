import { useEffect, useState } from "react";
import { getAssets, UpdateAssets } from "../services/assetsService";
import { BuyAsset } from "../services/TradeServicie";
import AssetFilters from "./AssetFilters";
import AssetPagination from "./AssetPagination";
import { getHistory } from "../services/assetsService";
import AssetHistoryCard from "./AssetHistoryCard";

export const AssetsComponent = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [order, setOrder] = useState("");
  const [current, setCurrent] = useState(0);
  const [cantidades, setCantidades] = useState({});
  const [estadoAsset, setEstadoAsset] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [listo, setListo] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [nombreHistorial, setNombreHistorial] = useState("");
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const max=5;
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
      if (error.response?.status === 404) {
        setNotFound(true);
      } else {
        console.error(error);
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    cargarAssets();
  }, []);

  useEffect(() => {
    if (!listo) return;

    const actualizarAssets = async () => {
      try {
        await UpdateAssets();
      } catch (error) {
       if (error.response?.status === 403) {
         console.log("Acceso denegado");
       } else if(error.response?.status === 404){
         console.error("No existe el asset");
        }else{ console.log(error);}
      }

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
            const total = ((actual - anterior) / anterior) * 100;
            acc[nuevo.id] = total;
            return acc;
          }, {});

          setEstadoAsset(nuevoEstado);
          return nuevos;
        });
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(actualizarAssets, REFRESH_TIME);
    return () => clearInterval(interval);
  }, [listo]);

 // AssetsComponent.jsx
const verHistorial = async (id, nombre) => {
  try {
    const data = await getHistory(id, max);

    setHistorial(data);
    setNombreHistorial(nombre);
    setMostrarHistorial(true);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 400) {
    console.log("el asset actual no tiene cambios");
    setHistorial([]);
    setNombreHistorial(nombre);
    setMostrarHistorial(true);    
    }
  }
};
  const cambiarCantidad = (id, valor) => {
    if (valor === "") {
      setCantidades((prev) => ({ ...prev, [id]: "" }));
      return;
    }
    const numero = Number(valor);
    if (numero < 1) return;
    setCantidades((prev) => ({ ...prev, [id]: numero }));
  };

  const comprar = async (id, cantidad) => {
    if (!cantidad || cantidad < 1) {
      alert("Ingrese una cantidad válida");
      return;
    }
    try {
      await BuyAsset(id, cantidad);
      alert("Compra realizada correctamente");
    } catch (error) {
      if(error.response?.status===409){
         alert("Dinero insuficiente");
      }else{
      console.error(error);
      alert("Error al comprar el asset");}
    }
  };

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
          search={search}
          setSearch={setSearch}
          order={order}
          setOrder={setOrder}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <button
          onClick={cargarAssets}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      <div className="flex items-center gap-4">
        <AssetPagination
          side="left"
          current={current}
          setCurrent={setCurrent}
          total={assetsFiltrados.length}
        />

        {notFound ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <p className="text-gray-400 text-lg">No se encontró ningún asset.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 flex-1">
            {visibles.map((asset) => {
              const porcentaje = estadoAsset[asset.id];

              return (
                <div
                  key={asset.id}
                  className="border border-green-500 rounded-xl p-4 text-center bg-neutral-950"
                >
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {asset.Nombre}
                  </h3>
                  <p className="text-green-500 text-2xl mb-2">
                    ${Number(asset.Precio).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  {porcentaje === undefined || porcentaje === 0 ? (
                    <p className="text-gray-400 font-bold mb-2">▬ 0.00%</p>
                  ) : porcentaje > 0 ? (
                    <p className="text-green-400 font-bold mb-2">▲ Subio</p>
                  ) : (
                    <p className="text-red-400 font-bold mb-2">▼ Bajo</p>
                  )}

                  <input
                    type="number"
                    min="1"
                    placeholder="Cantidad"
                    value={cantidades[asset.id] || ""}
                    onChange={(e) => cambiarCantidad(asset.id, e.target.value)}
                    className="w-full mb-3 bg-black border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => comprar(asset.id, cantidades[asset.id])}
                    className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-semibold"
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => verHistorial(asset.id,asset.Nombre)}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
                  >
                    Ver historial
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <AssetPagination
          side="right"
          current={current}
          setCurrent={setCurrent}
          total={assetsFiltrados.length}
        />
      </div>

      <AssetHistoryCard
        historial={mostrarHistorial ? historial : null}
        nombre={nombreHistorial}
        onClose={() => setMostrarHistorial(false)}
      />
    </div>
  );
};