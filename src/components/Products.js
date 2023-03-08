import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Cookie from "js-cookie";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonValue, setButtonValue] = useState("Add to Cart");
  const authCookie = Cookie.get("auth");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (id) => {
    console.log(`Redirect to product with id: ${id}`);
    // logic to redirect to specific product page
    navigate(`/Product/${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (productId) => {
    if (!authCookie) {
      navigate("/login");
      return;
    }
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const selectedProduct = products.find(
      (product) => product.product_id === productId
    );
    if (selectedProduct && !cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
      console.log(`Adding ${selectedProduct.product_name} to cart`);
    } else {
      console.log("Product already in cart");
    }
  };

  const startBounceAnimation = (event) => {
    const button = event.target;
    button.style.animation = "bounce 0.4s ease";

    setTimeout(() => {
      button.style.animation = "";
    }, 500);
  };

  return (
    <div className="product-list-container">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by product name"
        />
      </div>
      {searchTerm !== ""}

      <div className="product-list">
        {products
          .filter((product) =>
            product.product_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => {
            if (a.image === "" && b.image !== "") return 1;
            if (a.image !== "" && b.image === "") return -1;
            return 0;
          })
          .map((product) => (
            <div key={product.product_id}>
              <img
                className="product-img-list"
                onClick={() => handleClick(product.product_id)}
                src={`http://localhost/seoulkravingsAPI/${product.image}`}
                alt={product.product_name}
              />
              <h3>
                {product.product_name.length > 23
                  ? `${product.product_name.substring(0, 20)}...`
                  : product.product_name}
              </h3>
              <p>₱{product.unit_price}</p>
              {product.units_in_stock > 0 ? (
                <input
                  type="submit"
                  onClick={(event) => {
                    addToCart(product.product_id);
                    startBounceAnimation(event);
                  }}
                  value={buttonValue}
                ></input>
              ) : (
                <p style={{ color: "red" }}>Out of Stock</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
