import { useState } from "react";

export default function ExchangeRatePage() {
  const [exchangeRateData, setExchangeRateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/soap/tipocambio");
      if (!response.ok) {
        throw new Error("No se pudo obtener el tipo de cambio");
      }
      const data = await response.json();
      setExchangeRateData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tipo de Cambio del Día
        </h1>

        <button
          onClick={fetchExchangeRate}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? "Cargando..." : "Obtener Tipo de Cambio"}
        </button>

        {error && (
          <div className="mt-4 text-red-600 font-medium">
            Error: {error}
          </div>
        )}

        {exchangeRateData && (
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-800">Fecha:</span>{" "}
              {exchangeRateData.date}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-800">Tipo de Cambio:</span>{" "}
              {exchangeRateData.exchangeRate}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-800">Moneda:</span>{" "}
              {exchangeRateData.currency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
