import React, { useState, useEffect } from "react";

import NavBar from "../components/Nav";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const card = {
    padding: "25px",

    fontFamily: "Arail, sans-serif",
  };

  const productDetails = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
  };

  const imageProduct = {
    width: "100%",
    heigth: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const grids = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px , 1fr)",
    gap: "20px",
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        // console.log("products", data);
        // console.log("products", data.products);
        setProducts(data.products);
        console.log(products);
      } catch (err) {
        console.error("Error while fetching the products");
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <NavBar />
      <div style={card} className="container">
        <h1>Products</h1>
        <div style={grids}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} style={productDetails}>
                <Link to={`products/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={imageProduct}
                  />
                  <h3>{product.title}</h3>
                </Link>
                <p>{product.brand}</p>
                <p>Rating: {product.rating} / 5</p>
                <p>Price: {product.price}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
