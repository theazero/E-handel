import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Orderhis = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Kunde inte hämta ordrar. Kontrollera att du är inloggad.");
        }

        const data = await response.json();
        console.log("Hämtade ordrar:", data);
        setOrders(data); // Sätt ordrarna i state
      } catch (err) {
        console.error("Fel vid hämtning av ordrar:", err.message);
        setError(err.message);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orderhistorik</h1>
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 ? (
        <p>Du har inga ordrar ännu.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Ordernummer</th>
              <th className="border border-gray-300 px-4 py-2">Produkter</th>
              <th className="border border-gray-300 px-4 py-2">Totalpris</th>
              <th className="border border-gray-300 px-4 py-2">Datum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.products.map((p) => (
                    <div key={p.product._id}>
                      {p.product.name} (x{p.quantity})
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">{order.totalPrice} kr</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orderhis;

