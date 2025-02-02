import React from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

function Header() {
  const token = useSelector((state) => state.auth.token); // Hämtar token från Redux

  return (
    <header>
      <ul className="header">
        <li>
          <NavLink className="nav-link" to="/products">Butiken</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/">Start</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/cart">Varukorg</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/checkout">Betala</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/regForm">Kontakt</NavLink>
        </li>
        <li>
          {token ? (
            <>
              <Link className="nav-link2" to="/orderhistorik">Orderhistorik</Link>
              <span className="nav-link3">Inloggad</span>
            </>
          ) : (
            <NavLink className="nav-link" to="/LoginReg">Logga in</NavLink>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
