import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (id) => {
    console.log(`Redirect to product with id: ${id}`);
    // your logic to redirect to specific product page
  };

  return (
    <div className="product-list">
      {products
        .sort((a, b) => {
          if (a.image === "" && b.image !== "") return 1;
          if (a.image !== "" && b.image === "") return -1;
          return 0;
        })
        .map((product) => (
          <div key={product.product_name}>
            <img
              onClick={() => handleClick(product.id)}
              src={`http://test1domain.infinityfreeapp.com/seoulkravingsAPI/${product.image}`}
              alt={product.product_name}
            />
            <h3>
              {product.product_name.length > 23
                ? `${product.product_name.substring(0, 20)}...`
                : product.product_name}
            </h3>
            <p>₱{product.unit_price}</p>
            <input type="submit" value="Add to Cart"></input>
          </div>
        ))}
    </div>
  );
}

export default Products;
