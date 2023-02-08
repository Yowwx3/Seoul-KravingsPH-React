import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

function Product() {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost/seoulkravingsAPI/?product_id=${product_id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = () => {
    // Add logic for adding to cart here
    console.log(`Adding ${quantity} of ${product.product_name} to cart`);
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
                    <label htmlFor="quantity">Quantity: </label>
                    <button
                      onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(e.target.value, product.units_in_stock)
                        )
                      }
                      max={product.units_in_stock}
                    ></input>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(quantity + 1, product.units_in_stock)
                        )
                      }
                    >
                      +
                    </button>
                    &nbsp;
                    <button onClick={handleAddToCart}>Add to Cart</button>{" "}
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
      <Footer />
    </div>
  );
}

export default Product;
