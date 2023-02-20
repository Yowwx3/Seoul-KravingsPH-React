import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    const storedQuantities =
      JSON.parse(localStorage.getItem("quantities")) || {};
    setQuantities(storedQuantities);
  }, []);

  const filteredProducts = products.filter((product) =>
    cart.includes(product.product_id)
  );

  const total = filteredProducts.reduce(
    (acc, product) =>
      acc + product.unit_price * (quantities[product.product_id] || 1),
    0
  );

  const updateQuantity = (productId, quantity) => {
    // Convert the input value to an integer
    const value = parseInt(quantity, 10);

    // Check if the input value is a number and not NaN
    if (!isNaN(value)) {
      // Limit the input value to the max value
      const max = products.find(
        (product) => product.product_id === productId
      ).units_in_stock;
      const limitedValue = Math.min(value, max);

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: limitedValue,
      }));
    }
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter((id) => id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    localStorage.removeItem("quantities");
    setQuantities({});
  };

  return (
    <div className="Cart-body">
      <div className="Cart-Container">
        <div className="Header">
          <h1>Shopping Cart</h1>

          <h5
            className="Action"
            onClick={() => {
              localStorage.removeItem("cart");
              setCart([]);
              localStorage.removeItem("quantities");
              setQuantities([]);
            }}
          >
            Remove all
          </h5>
        </div>

        <div className="Cart-Items">
          {filteredProducts.length === 0 && (
            <p
              className="alt-message-cart"
              onClick={() => navigate("/Products")}
            >
              Order something!
            </p>
          )}

          <div className="Cart_Item"> </div>
          {filteredProducts.length === 0 ? null : <hr />}
          {filteredProducts.map((product) => (
            <div className="Cart_Items-2" key={product.product_id}>
              <img
                className="Cart-Image"
                src={`http://localhost/seoulkravingsAPI/${product.image}`}
                alt={product.product_name}
              />
              <div className="cart-name">
                {product.product_name.length > 17
                  ? `${product.product_name.substring(0, 20)}...`
                  : product.product_name}
                <h6 className="cart-stock">
                  {product.units_in_stock} pieces available
                </h6>
              </div>
              <h4>₱{product.unit_price}</h4>
              <input
                className="quantitybox"
                type="number"
                value={quantities[product.product_id] || 1} // set value to current quantity, default to 1
                min={1}
                max={product.units_in_stock}
                onClick={(event) => event.target.select()}
                onChange={(e) =>
                  updateQuantity(product.product_id, e.target.value)
                }
              />
              <h4 className="unit-total">
                Total:₱
                {product.unit_price * (quantities[product.product_id] || 1)}
              </h4>
              <h4
                className="unit-remove"
                onClick={() => removeItemFromCart(product.product_id)}
              >
                Remove
              </h4>
            </div>
          ))}
          {filteredProducts.length > 0 && (
            <>
              <hr />
              <div className="Cart-Total-Container">
                <h2 className="Cart-Total">
                  Sub-Total: <span style={{ color: "red" }}>₱{total}</span>
                </h2>
                <h2
                  onClick={() => {
                    // Check if all products in cart have a quantity value, set to 1 if not
                    const updatedQuantities = {};
                    cart.forEach((productId) => {
                      if (!quantities.hasOwnProperty(productId)) {
                        updatedQuantities[productId] = 1;
                      } else {
                        updatedQuantities[productId] = quantities[productId];
                      }
                    });
                    localStorage.setItem(
                      "quantities",
                      JSON.stringify(updatedQuantities)
                    );
                    navigate("/Checkout");
                  }}
                  className="Cart-Submit"
                >
                  Checkout
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
