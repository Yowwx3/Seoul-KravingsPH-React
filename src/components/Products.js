import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
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
                <input type="submit" value="Add to Cart"></input>
              ) : (
                <p style={{ color: "red" }}>Out of Stock</p>
              )}
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
