import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/AddToCart.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("https://ajio-be.onrender.com/cart")
      .then(res => setCartItems(res.data))
      .catch(err => console.log("Error loading cart:", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://ajio-be.onrender.com/cart/${id}`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.log("Delete failed:", err));
  };

  const updateQty = (item, type) => {

    const newQty = type === "inc" ? parseInt(item.qty) + 1 : parseInt(item.qty) - 1;

    if (newQty < 1) return;

    const updated = { ...item, qty: newQty };

    axios.put(`https://ajio-be.onrender.com/cart/${item.id}`, updated)
      .then(() => {
        setCartItems(prev => prev.map(i => i.id === item.id ? updated : i));
      })
      .catch(err => console.log("Qty update failed:", err));
  };

  const cleanNumber = (value) => {
    if (!value) return 0;
    return Number(value.toString().replace(/[₹,]/g, '')) || 0;
  };

  const totalOriginal = cartItems.reduce((sum, item) => {
    const op = cleanNumber(item.originalPrice);
    const qty = Number(item.qty) || 1;
    return sum + op * qty;
  }, 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const p = cleanNumber(item.price);
    const qty = Number(item.qty) || 1;
    return sum + p * qty;
  }, 0);

  const totalDiscount = totalOriginal - totalPrice;






  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* 🛒 Cart Section */}
        <div className="col-12 col-md-8">
          <h4 className="mb-4">👜 My Bag ({cartItems.length} item{cartItems.length !== 1 && 's'})</h4>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map(item => (
              <div className="card mb-3 shadow-sm border-0" key={item.id}>
                <div className="row g-0 align-items-center">
                  <div className="col-12 col-sm-4 col-md-3">
                    <img src={item.image} className="img-fluid p-3 rounded-start" alt="Product" />
                  </div>
                  <div className="col-12 col-sm-8 col-md-9">
                    <div className="card-body">
                      <h6 className="fw-bold">{item.name}</h6>
                      <p className="mb-1">Size: {item.size}</p>

                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => updateQty(item, "dec")}
                        >−</button>

                        <span className="px-2 fw-bold">{item.qty}</span>

                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => updateQty(item, "inc")}
                        >+</button>
                      </div>

                      <div className="d-flex flex-column">
                        <small className="text-success">You save ₹{parseFloat(item.originalPrice) - parseFloat(item.price)}</small>
                        <small className="text-muted">Original: ₹{item.originalPrice}</small>
                        <h6 className="text-primary mt-1">Price: ₹{item.price}</h6>
                      </div>

                      <div className="mt-3">
                        <button onClick={() => handleDelete(item.id)} className="btn btn-link text-danger p-0 me-3">
                          Delete
                        </button>
                        <Link to="/wishlist" className="btn btn-link p-0">Move to Wishlist</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🧾 Order Summary */}
        <div className="col-12 col-md-4 mt-4 mt-md-0">
          <div className="card shadow-sm border-0 p-3">
            <h5 className="mb-3">Order Summary</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="mb-1">Bag Total</p>
              <p className="mb-1">₹{isNaN(totalOriginal) ? "0.00" : totalOriginal.toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-1">Bag Discount</p>
              <p className="mb-1 text-success">- ₹{isNaN(totalDiscount) ? "0.00" : totalDiscount.toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-1">Delivery Fee</p>
              <p className="mb-1 text-success">Free <s className="text-muted">₹99</s></p>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <p className="mb-1">Order Total</p>
              <p className="mb-1">₹{isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2)}</p>
            </div>

            <button className="btn btn-primary w-100 mt-3">PROCEED TO SHIPPING</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CartPage;
