import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App.jsx';
import Header from './components/Header';
import Products from './components/Products';
import Productdetails from './components/Productdetails';
import RegForm from './components/Regform.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import LoginReg from './components/LoginReg.jsx';
import Orderhis from './components/private/Orderhis';
import PrivateRoute from './components/private/PrivateRoute';

const root = createRoot(document.getElementById('root'));

// Funktion för att komma åt token från Redux
function Root() {
  const token = useSelector((state) => state.auth.token); // Auth reducer hanterar token

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetails/:id" element={<Productdetails />} />
        <Route path="/regform" element={<RegForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/loginReg" element={<LoginReg />} />
        <Route
          path="/orderhistorik"
          element={
            <PrivateRoute token={token}>
              <Orderhis />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>
);
