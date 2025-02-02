import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token); // Hämta token
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const products = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Skicka token
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte spara order. Kontrollera uppgifterna.");
      }

      const data = await response.json();
      console.log("Order skapad:", data);
      alert("Tack för ditt köp!");
      dispatch(clearCart()); // Töm varukorgen efter köp
    } catch (error) {
      console.error("Köp-fel:", error.message);
      alert("Något gick fel vid köp. Försök igen senare.");
    }
  };

  return (
    <div>
      <h1>Betala för din order:</h1>
      {cartItems.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} style={{ marginBottom: '20px' }}>
                <h2>{item.name}</h2>
                <p>Antal: {item.quantity}</p>
                <p>Pris: {item.price} SEK</p>
              </li>
            ))}
          </ul>
          <h2>Totalpris: {totalPrice} SEK</h2>
          <div>
            <button onClick={handleCheckout} style={{ marginRight: '10px' }}>
              Genomför köp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
