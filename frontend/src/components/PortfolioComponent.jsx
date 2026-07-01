import { useEffect, useState } from "react";
import { getPortfolio, deleteAssetPortfolio } from "../services/portfolioService";
import { BuyAsset, SellAsset } from "../services/TradeServicie";
import { getUser } from "../services/usersService";
import { getTransactions } from "../services/transactionsService";
import useAuth from "../hooks/useAuth";
export const PortfolioComponent = () => {

  const { token, logout } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [availableCash, setAvailableCash] = useState(0);
  const [assetQuantities, setAssetQuantities] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [operationError, setOperationError] = useState("");
  const [buyPrices, setBuyPrices] = useState({});

  const tokenVencido = (err) => {
  if (!token || err.response?.status === 401) {
    logout();
    return true;
  }
  return false;
};

  const ObtenerPorfolio = async () => {
    try {
      const [portfolioData, userData] = await Promise.all([
        getPortfolio(),
        getUser(),
      ]);

      const portfolioArray = Array.isArray(portfolioData)
        ? portfolioData
        : portfolioData.assets ?? [];

      setPortfolio(portfolioArray);
      setAvailableCash(userData.Saldo);

      const initialQuantities = portfolioArray.reduce((acc, asset) => {
        acc[asset.id] = 1;
        return acc;
      }, {});
      setAssetQuantities(initialQuantities);

      const prices = {};
      await Promise.all(
        portfolioArray.map(async (asset) => {
          try {
            const transactions = await getTransactions(asset.id, "buy");
            const match = transactions.find((t) => t.asset === asset.asset);
            if (match) prices[asset.id] = Number(match.price_per_unit);
          } catch (_) {}
        })
      );
      setBuyPrices(prices);

    } catch (err) {
      if (!tokenVencido(err)) console.error(err);
    }
  };

  useEffect(() => {
    ObtenerPorfolio();
  }, []);

  const formatCurrency = (n) =>
    "$" + Number(n).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const calculateMaxBuyQuantity = (asset) =>
    Math.min(20, Math.floor(availableCash / Number(asset.current_price)));

  const openModal = (type, asset) => {
    setActiveModal({ type, asset });
    setModalQuantity(1);
    setOperationError("");
  };

  const closeModal = () => {
    setActiveModal(null);
    setOperationError("");
  };

  const handleBuyConfirm = async () => {
    const quantity = assetQuantities[activeModal.asset.id];
    if (!quantity || quantity < 1) {
      setOperationError("Ingresá una cantidad válida.");
      return;
    }
    const totalCost = quantity * Number(activeModal.asset.current_price);
    if (totalCost > availableCash) {
      setOperationError("Saldo insuficiente para esta operación.");
      return;
    }
    try {
      await BuyAsset(activeModal.asset.id, quantity);
      await ObtenerPorfolio();
      closeModal();
    } catch (err) {
      if (tokenVencido(err)) return;
      if (err.response?.status === 409) setOperationError("Dinero insuficiente.");
      else setOperationError("Error al comprar.");
    }
  };

  const handleSellConfirm = async () => {
    if (modalQuantity < 1) return;
    try {
      await SellAsset(activeModal.asset.id, modalQuantity);
      await ObtenerPorfolio();
      closeModal();
    } catch (err) {
      if (tokenVencido(err)) return;
      setOperationError("Error al vender.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAssetPortfolio(activeModal.asset.id);
      await ObtenerPorfolio();
      closeModal();
    } catch (err) {
      if (tokenVencido(err)) return;
      if (err.response?.status === 409) setOperationError("No puedes quitar un activo de tu portfolio si aún tienes unidades.");
      else if (err.response?.status === 404) setOperationError("El activo no existe en tu portfolio.");
      else setOperationError("Error al eliminar.");
    }
  };

  const updateAssetQuantity = (id, val) => {
    if (val === "") {
      setAssetQuantities((prev) => ({ ...prev, [id]: "" }));
      return;
    }
    let parsed = Number(val);
    if (parsed < 1) return;
    const asset = portfolio.find((a) => a.id === id);
    const max = calculateMaxBuyQuantity(asset);
    if (parsed > max) parsed = max;
    setAssetQuantities((prev) => ({ ...prev, [id]: parsed }));
  };

  const buyTotalCost =
    activeModal?.type === "buy"
      ? (assetQuantities[activeModal.asset?.id] ?? 1) * Number(activeModal.asset.current_price)
      : 0;

  const sellEarnings =
    activeModal?.type === "sell"
      ? modalQuantity * Number(activeModal.asset.current_price)
      : 0;

  return (
    <div className="max-w-3xl mx-auto mt-8 border border-green-500 rounded-2xl p-4 bg-black">

      <div className="flex items-center mb-4">
        <h1 className="text-white text-xl font-medium">Mi portfolio</h1>
      </div>

      <div className="flex justify-between items-center bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 mb-4">
        <span className="text-neutral-500 text-sm">Dinero disponible</span>
        <span className="text-white text-base font-medium">{formatCurrency(availableCash)}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {portfolio.map((asset) => {
          const cannotBuy = availableCash <= 0 || calculateMaxBuyQuantity(asset) === 0;
          return (
            <div
              key={asset.id}
              className="border border-green-500 rounded-xl p-4 bg-neutral-950 text-center"
            >
              <h3 className="text-white text-2xl font-bold mb-1">{asset.asset}</h3>
              <p className="text-green-500 text-lg mb-1">
                Precio Actual: {formatCurrency(asset.current_price)}
              </p>
              <p className="text-neutral-400 text-xs mb-3">
                Precio de Compra: {buyPrices[asset.id] != null ? formatCurrency(buyPrices[asset.id]) : "—"}
              </p>
              <p className="text-neutral-500 text-xs mb-3">
                {Number(asset.quantity).toLocaleString("es-AR")} unidades
              </p>
              <input
                type="number"
                min="1"
                max={calculateMaxBuyQuantity(asset)}
                value={assetQuantities[asset.id] ?? ""}
                onChange={(e) => updateAssetQuantity(asset.id, e.target.value)}
                className="w-full mb-2 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500"
              />
              <button
                onClick={() => openModal("buy", asset)}
                disabled={cannotBuy}
                className="w-full mb-2 bg-transparent border border-neutral-600 text-white font-semibold py-2 rounded-lg hover:bg-neutral-800 disabled:opacity-35 disabled:cursor-not-allowed text-sm"
              >
                Comprar
              </button>
              <button
                onClick={() => openModal("sell", asset)}
                disabled={Number(asset.quantity) === 0}
                className="w-full mb-2 bg-transparent border border-neutral-600 text-neutral-300 py-2 rounded-lg hover:bg-neutral-800 disabled:opacity-35 disabled:cursor-not-allowed text-sm"
              >
                Vender
              </button>
              {Number(asset.quantity) === 0 && (
                <button
                  onClick={() => openModal("delete", asset)}
                  className="w-full bg-transparent border border-red-600 text-red-500 py-2 rounded-lg hover:bg-red-950 text-sm"
                >
                  Eliminar
                </button>
              )}
            </div>
          );
        })}
      </div>

      {activeModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-neutral-950 border border-green-500 rounded-2xl p-5 w-80">

            {activeModal.type === "buy" && (
              <>
                <p className="text-white text-base font-semibold mb-1">Comprar {activeModal.asset.asset}</p>
                <p className="text-neutral-500 text-xs mb-4">
                  Precio actual {formatCurrency(activeModal.asset.current_price)} · Disponible {formatCurrency(availableCash)}
                </p>
                {calculateMaxBuyQuantity(activeModal.asset) === 0 ? (
                  <p className="text-red-400 text-xs mb-4">Saldo insuficiente para comprar.</p>
                ) : (
                  <>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>Cantidad (máx. {calculateMaxBuyQuantity(activeModal.asset)})</span>
                      <span className="text-white font-medium">{assetQuantities[activeModal.asset.id] ?? 1}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max={calculateMaxBuyQuantity(activeModal.asset)}
                      value={assetQuantities[activeModal.asset.id] ?? 1}
                      step="1"
                      onChange={(e) => updateAssetQuantity(activeModal.asset.id, e.target.value)}
                      className="w-full accent-green-500 mb-3"
                    />
                    <div className="flex justify-between bg-neutral-900 rounded-lg px-3 py-2 mb-3">
                      <span className="text-neutral-500 text-xs">Total</span>
                      <span className="text-white font-medium text-sm">{formatCurrency(buyTotalCost)}</span>
                    </div>
                  </>
                )}
                {operationError && <p className="text-red-400 text-xs mb-2">{operationError}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={closeModal} className="flex-1 border border-neutral-600 text-neutral-300 py-2 rounded-lg text-sm hover:bg-neutral-800">Cancelar</button>
                  <button onClick={handleBuyConfirm} disabled={calculateMaxBuyQuantity(activeModal.asset) === 0} className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed">Confirmar</button>
                </div>
              </>
            )}

            {activeModal.type === "sell" && (
              <>
                <p className="text-white text-base font-semibold mb-1">Vender {activeModal.asset.asset}</p>
                <p className="text-neutral-500 text-xs mb-4">Precio actual {formatCurrency(activeModal.asset.current_price)}</p>
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>Cantidad</span>
                  <span className="text-white font-medium">{modalQuantity}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={Number(activeModal.asset.quantity)}
                  value={modalQuantity}
                  step="1"
                  onChange={(e) => setModalQuantity(Number(e.target.value))}
                  className="w-full accent-green-500 mb-3"
                />
                <div className="flex justify-between bg-neutral-900 rounded-lg px-3 py-2 mb-3">
                  <span className="text-neutral-500 text-xs">Recibirás</span>
                  <span className="text-white font-medium text-sm">{formatCurrency(sellEarnings)}</span>
                </div>
                {operationError && <p className="text-red-400 text-xs mb-2">{operationError}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={closeModal} className="flex-1 border border-neutral-600 text-neutral-300 py-2 rounded-lg text-sm hover:bg-neutral-800">Cancelar</button>
                  <button onClick={handleSellConfirm} className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-semibold">Confirmar</button>
                </div>
              </>
            )}

            {activeModal.type === "delete" && (
              <>
                <p className="text-white text-base font-semibold mb-1">Eliminar {activeModal.asset.asset}</p>
                <p className="text-neutral-500 text-xs mb-4">Se quitará del portfolio. No se puede deshacer.</p>
                {operationError && <p className="text-red-400 text-xs mb-2">{operationError}</p>}
                <div className="flex gap-2 mt-2"> 
                  <button onClick={closeModal} className="flex-1 border border-neutral-600 text-neutral-300 py-2 rounded-lg text-sm hover:bg-neutral-800">Cancelar</button>
                  <button onClick={handleDeleteConfirm} className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg text-sm font-semibold">Eliminar</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};