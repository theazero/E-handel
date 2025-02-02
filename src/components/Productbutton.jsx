import React from 'react';
import { useNavigate } from 'react-router';

const ProductButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="infobutton">
      {children}
    </button>
  );
};

function Productbutton({ productId }) {
  const navigate = useNavigate();

  return (
    <div>
      <ProductButton onClick={() => navigate(`/productdetails/${productId}`)}>
        Mer info
      </ProductButton>
    </div>
  );
}

export default Productbutton;
