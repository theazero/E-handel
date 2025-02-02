import React, { useState, useEffect } from 'react';
import Productbutton from './Productbutton';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // Kategorier
  const [selectedCategory, setSelectedCategory] = useState('All'); // Vald kategori

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://js2-ecommerce-api.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data); 
        setProducts(data);

        const uniqueCategories = ['All', ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrera produkterna baserat på vald kategori
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <p>Laddar...</p>;
  }

  return (
    <div>
      <h1>Produkter</h1>
      
       {/* Kategorier */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="categoryFilter">Filtrera: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '5px 10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginLeft: '10px',
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Produktlista */}
      <ul className="productlist">
        {filteredProducts.map((product) => (
          <li key={product._id} style={{ marginBottom: '20px' }}>
            <h2>{product.name}</h2>
            <img
              src={product.images[0]} 
              alt={product.name}
              style={{ width: '300px', height: 'auto', objectFit: 'cover' }}
            />
            <Productbutton productId={product._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
