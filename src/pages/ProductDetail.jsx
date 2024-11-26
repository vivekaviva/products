import React, { useState, useEffect } from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/ProductDetails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("product id", id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        console.log("data", data);
        setProduct(data);
      } catch (error) {
        console.error("Error while fetching the product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    console.log("Add to cart", product);
    navigate("/cart");
  };

  console.log("product", product);
  return (
    <>
      <NavBar />
      {product && (
        <div className="container">
          <div className="row f-flex justify-content-around mb-5">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <img
                src={product.images[0]}
                alt={product.title}
                height="500"
                width="500"
              />
            </div>
            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.title}</h3>
              <p id="product_id">Product # {product.id}</p>
              <p className="brandColor"> Category : {product.category}</p>
              <hr />
              <div className="">{product.description}</div>
              <hr />
              <div className="rating-outer">
                <div className="rating-inner">Rating: {product.rating}/5</div>
              </div>
              <div className="mt-3 productPrice">Price: {product.price}</div>
              <div className="mt-3">
                {/* {product.tag.length > 0 ? (
            products.map((tag) => ):null} */}

                {product.tags.length > 0
                  ? product.tags.map((tag) => (
                      <span className="badge bg-info text-light me-2">
                        {tag}
                      </span>
                    ))
                  : null}
              </div>
              <div className="mt-3">
                Availability :<strong> {product.availabilityStatus}</strong>
              </div>
              <div className="mt-3">
                Warranty : {product.warrantyInformation}
              </div>
              <div className="mt-3">{product.returnPolicy}</div>
              <div className="mt-3">
                Discount : {product.discountPercentage} %
              </div>
              {product.meta?.qrCode && (
                <div className="mt-3">
                  <h5>Scan the QR Code:</h5>
                  <img
                    src={product.meta.qrCode}
                    alt="QR Code"
                    height="200"
                    width="200"
                  />
                </div>
              )}
              <div>
                <button onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
