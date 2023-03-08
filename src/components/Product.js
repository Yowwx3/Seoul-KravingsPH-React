import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Cookie from "js-cookie";

function Product() {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const authCookie = Cookie.get("auth");

  const startBounceAnimation = (event) => {
    const button = event.target;
    button.style.animation = "bounce 0.4s ease";

    setTimeout(() => {
      button.style.animation = "";
    }, 500);
  };

  useEffect(() => {
    axios
      .get(`http://localhost/seoulkravingsAPI/?product_id=${product_id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product_id) => {
    if (!authCookie) {
      navigate("/login");
      return;
    }
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    if (!cart.includes(product_id)) {
      cart.push(product_id);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
      console.log(`Adding ${product.product_name} to cart`);
    } else {
      console.log("Product already in cart");
    }
  };

  return (
    <div className="product-container">
      <div className="product">
        <div className="small-container">
          <div className="row">
            <div className="col-2">
              <div className="product-header">
                {product.image && (
                  <img
                    src={`http://localhost/seoulkravingsAPI/${product.image}`}
                    alt={product.product_name}
                  />
                )}
              </div>
            </div>
            <div className="col-2">
              {" "}
              <h1>{product.product_name}</h1>
              <h2>₱{product.unit_price}</h2>
              <div className="add-to-cart">
                {product.units_in_stock > 0 ? (
                  <>
                    &nbsp;
                    <button
                      onClick={(event) => {
                        handleAddToCart(product.product_id);
                        startBounceAnimation(event);
                      }}
                    >
                      Add to Cart
                    </button>
                    &nbsp;
                    <h4>{product.units_in_stock} pieces available</h4>
                  </>
                ) : (
                  <h4 style={{ color: "red" }}>Out of Stock</h4>
                )}
              </div>
              <h3>Product Description</h3>
              <p>
                {" "}
                <hr />
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
