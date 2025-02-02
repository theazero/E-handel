import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function Productdetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://js2-ecommerce-api.vercel.app/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        console.log('Fetched product:', data);
        setProduct(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return; // Säkerställ att produktdata finns
    dispatch(addToCart(product)); // Lägg till produkten i varukorgen
    alert('Produkten har lagts till i varukorgen!');
  };
  

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (!product) {
    return <p>Hittar inte orodukten</p>;
  }

  return (
    <div>
      <h1>{product.name || 'No name available'}</h1>
      <p>{product.description || 'No description available'}</p>
      <p><strong>Price:</strong> {product.price ? `${product.price} SEK` : 'Price not available'}</p>
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.name || 'Product image'}
          style={{ width: '300px', height: 'auto', objectFit: 'cover' }}
        />
      ) : (
        <p>No image available</p>
      )}
      <button onClick={handleAddToCart} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
        Lägg till i varukorg
      </button>
    </div>
  );
}

export default Productdetails;
