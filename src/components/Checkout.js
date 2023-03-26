import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import paypal from "../images/PayPal.png";
import gcash from "../images/gcash.png";
import gcashqr from "../images/gcashqr.jpg";
import Cookie from "js-cookie";

const PlaceOrder = ({ disabled, onClick, children }) => {
  const handleClick = (event) => {
    if (!disabled) {
      onClick(event);
    }
  };

  return (
    <div className="Cart-Submit-Container">
      <h2
        className={`Cart-Submit ${disabled ? "disabled" : ""}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </h2>
      {disabled && (
        <span
          className="disabled-text"
          title="Fill out the address form"
        ></span>
      )}
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const id = Cookie.get("id");

  const [cart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [quantities] = useState(
    JSON.parse(localStorage.getItem("quantities")) || {}
  );

  const [products, setProducts] = useState([]);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [image, setImage] = useState("");

  const [address, setAddress] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((product) =>
    cart.includes(product.product_id)
  );

  const total =
    60 +
    filteredProducts.reduce(
      (acc, product) =>
        acc + product.unit_price * (quantities[product.product_id] || 1),
      0
    );

  //gcash
  const handleGcashSubmitOrder = () => {
    const formData = new FormData();
    formData.append("address", JSON.stringify(address));
    formData.append("total", total);
    formData.append("image", image);
    formData.append("image_name", image.name);
    formData.append("account_id", id);
    filteredProducts.forEach((product) => {
      formData.append(
        `products[${product.product_id}][product_id]`,
        product.product_id
      );
      formData.append(
        `products[${product.product_id}][quantity]`,
        quantities[product.product_id] || 1
      );
    });

    console.log(formData);

    axios
      .post("http://localhost/seoulkravingsAPI/orders.php", formData)
      .then((response) => {
        console.log("Order placed:", response.data);
        localStorage.clear();
        navigate("/OrderSuccess");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const handlePlaceOrder = () => {
    setShowPaymentPopup(true);
  };

  const policy = () => {
    setShowPolicyModal(true);
  };

  const modalRef = useRef();

  const [formComplete, setFormComplete] = useState(false);

  function handleInputChange(event) {
    // add validation logic here to check that all required fields are filled out correctly
    // checks that all required fields are non-empty
    const inputs = document.querySelectorAll("input[required]");
    const isComplete = Array.from(inputs).every((input) => input.value !== "");
    const name = event.target.name;
    const value = event.target.value;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    setFormComplete(isComplete);
  }

  console.log(quantities);

  return (
    <div className="Cart-body">
      <div className="Cart-Container">
        <div className="Header">
          <div>
            <h1>Checkout</h1> <h4>Enter your shipping address here.</h4>
          </div>
        </div>

        <div className="Cart-Items">
          <div className="Address-Form">
            <label>Full Name:</label>
            <input
              required
              type="text"
              name="full_name"
              onChange={handleInputChange}
            />

            <label>Street Address:</label>
            <input
              required
              type="text"
              name="street_address"
              onChange={handleInputChange}
            />

            <label>City:</label>
            <input
              required
              type="text"
              name="city"
              onChange={handleInputChange}
            />

            <label>Province:</label>
            <input
              required
              type="text"
              name="province"
              onChange={handleInputChange}
            />

            <label>Zip Code:</label>
            <input
              required
              type="number"
              name="zip_code"
              onChange={handleInputChange}
            />

            <label>Contact Number:</label>
            <input
              required
              type="number"
              name="contact_number"
              onChange={handleInputChange}
            />
          </div>

          {filteredProducts.map((product) => (
            <div key={product.product_id} className="Cart-Item">
              <div className="Cart-Item-Details">
                <div className="Cart-Item-Name">
                  {product.product_name}{" "}
                  <h5 className="Cart-Item-Quantity">
                    Quantity: {quantities[product.product_id] || 1}{" "}
                  </h5>
                </div>

                <div className="Cart-Item-Price">
                  Price:
                  {parseFloat(
                    product.unit_price * (quantities[product.product_id] || 1)
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </div>
              </div>
            </div>
          ))}
          <hr />

          <div className="Cart-Total-Container">
            {showPaymentPopup && (
              <div
                className="modal"
                onClick={(e) => {
                  if (modalRef.current === e.target) {
                    setShowPaymentPopup(false);
                  }
                }}
                ref={modalRef}
              >
                <div className="modal-content">
                  Select Payment <hr />
                  {selectedPayment === "gcash" && (
                    <div className="gcash-container">
                      <img className="GCash-QR" src={gcashqr} />
                      <h2 className="Cart-Total">
                        Total:{" "}
                        <span style={{ color: "red" }}>
                          {parseFloat(total).toLocaleString("en-US", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </span>
                      </h2>
                      <h3>Upload the GCash receipt here.</h3>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <h2
                        onClick={() => {
                          handleGcashSubmitOrder();
                        }}
                        className="Cart-Submit2"
                      >
                        Order Confirm
                      </h2>
                    </div>
                  )}
                  Please read the{" "}
                  <span
                    className="policy-click"
                    onClick={() => setShowPolicyModal(true)}
                  >
                    Order Policy{" "}
                  </span>
                  <br />
                  before placing an order
                  <h2
                    className="Gcash-Submit"
                    onClick={() => {
                      // Set state variable to indicate GCash payment has been selected
                      setSelectedPayment("gcash");
                    }}
                  >
                    <img
                      className="payment-method-img"
                      src={gcash}
                      alt="GCash"
                    />
                  </h2>
                  <h2
                    onClick={() => {
                      setShowPaymentPopup(false);
                    }}
                    className="Cart-Submit2"
                  >
                    Back
                  </h2>
                  {/* Conditionally render image and input elements for GCash payment */}
                </div>
              </div>
            )}{" "}
            {showPolicyModal && (
              <div className="modal">
                <div className="modal-content">
                  Order Policy <hr />
                  <div className="Order-Policy">
                    {" "}
                    <h3>Order Placement:</h3>
                    <p>
                      Customers can place orders for products through the web
                      application. Upon order placement, customers will be able
                      to view and monitor their order on the "Orders" section in
                      their account profile. This section will provide them with
                      the details of their order, as well as any updates on its
                      status.
                    </p>
                    <h3>Cancellation:</h3>
                    <p>
                      {" "}
                      Customers can cancel their order at any time before it is
                      processed. If the status of the order is "Processing" on
                      the order monitoring module for the customer, they can
                      still cancel their order. However, once the order status
                      is updated to "Delayed" or "Shipped", the customer cannot
                      cancel their order.
                    </p>
                    <h3>Proof of Payment:</h3>
                    <p>
                      Customers are required to upload a valid proof of payment
                      when placing an order. In case of a wrong uploaded image
                      of proof of payment, the order will be canceled.
                    </p>
                    <h3>Refunds:</h3>
                    <p>
                      Canceled orders that have already been paid for will be
                      refunded in an appropriate time. The refund process will
                      be initiated within 7 business days of the order
                      cancellation. The refund amount will be credited to the
                      customer's account through the same mode of payment used
                      during the order placement.{" "}
                    </p>
                    <h3>Note:</h3>
                    <p>
                      {" "}
                      We reserve the right to cancel any order if we are unable
                      to fulfill it due to unavailability of stock, pricing
                      errors, or any other reasons beyond our control. In such
                      cases, we will inform the customer of the cancellation and
                      initiate the refund process.
                    </p>
                  </div>
                  <h2
                    onClick={() => {
                      setShowPolicyModal(false);
                    }}
                    className="Cart-Submit2"
                  >
                    Back
                  </h2>
                </div>
              </div>
            )}
            <h3 className="Cart-Total">
              Shipping Fee: <span style={{ color: "red" }}>₱60.00</span>
            </h3>
            <h2 className="Cart-Total">
              Total:{" "}
              <span style={{ color: "red" }}>
                {parseFloat(total).toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                })}
              </span>
            </h2>
            <div className="Cart-Total-Container-Row">
              {" "}
              <h2
                onClick={() => {
                  navigate("/Cart");
                }}
                className="Cart-Submit"
              >
                Back
              </h2>{" "}
              <PlaceOrder disabled={!formComplete} onClick={handlePlaceOrder}>
                Place Order
              </PlaceOrder>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
