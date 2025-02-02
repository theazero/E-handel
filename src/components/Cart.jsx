import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, clearCart } from '../redux/cartSlice';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Varukorg</h1>
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
                <button onClick={() => handleRemove(item)}>Ta bort</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}>Töm varukorgen</button>
        </div>
      )}
      <div>
        <Link to="/checkout">
          <button>Gå till check-out</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
