import React, { useState, useEffect } from "react";

import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../assets/css/ProductDetails.css";

import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("https://dummyjson.com/carts/2");

        const data = await response.json();

        console.log("data", data);

        setCartItems(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching the cart items");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (id, amount) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;

        return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    console.log("delete id", id);

    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    toast.success("Cart Item removed");
  };

  if (loading) {
    return <p>Loading the cart items...</p>;
  }

  console.log(cartItems);

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="container">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            <hr />
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      height="90"
                      width="115"
                    />
                  </div>

                  <div className="col-5 col-lg-3">
                    {/* <a href="#">{item.title}</a> */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/products/${item.id}`);
                      }}
                      style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      {item.title}
                    </a>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <span
                        className="btn btn-danger minus"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item.quantity}
                        readOnly
                      />
                      <span
                        className="btn btn-primary plus"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    <i
                      id="delete_cart_item"
                      className="fa fa-trash btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    ></i>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  (Units)
                </span>
              </p>
              <p>
                Est. total:
                <span className="order-summary-values">
                  ${calculateTotalPrice()}
                </span>
              </p>

              <hr />
              <button id="checkout_btn" className="btn btn-primary btn-block">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
