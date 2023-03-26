import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const authCookie = parseInt(Cookie.get("auth"));
  const [TopProducts, setTopProducts] = useState([]);

  console.log(authCookie);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/insights.php")
      .then((response) => {
        console.log("Top selling products:", response.data);
        setTopProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function isTopProduct(product) {
    return TopProducts.some(
      (topProduct) => topProduct.product_id === product.product_id
    );
  }

  function getProducts() {
    axios.get("http://localhost/seoulkravingsAPI/").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteProduct = (product_id) => {
    axios
      .delete(`http://localhost/seoulkravingsAPI/?product_id=${product_id}`)
      .then(function (response) {
        console.log(response.data);
        getProducts();
      });
  };

  return (
    <div className="InventoryList">
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
        {products.some(
          (product) =>
            product.units_in_stock < 5 ||
            TopProducts.some(
              (topProduct) =>
                topProduct.product_id === product.product_id &&
                product.units_in_stock < 10
            )
        ) && (
          <div className="low-stock-message">
            Add more stocks to critically low level items.
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th className="php">Unit Price</th>
              <th>Description</th>
              <th>Stocks</th>
              <th>
                {" "}
                <Link to="/AddInventory" className="crud-buttons">
                  Add
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.product_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .sort((a, b) => {
                const aIsTopProduct = TopProducts.some(
                  (topProduct) => topProduct.product_id === a.product_id
                );
                const bIsTopProduct = TopProducts.some(
                  (topProduct) => topProduct.product_id === b.product_id
                );
                if (aIsTopProduct && bIsTopProduct) {
                  // both are top products, sort by stock level
                  return a.units_in_stock - b.units_in_stock;
                } else if (aIsTopProduct) {
                  // a is a top product, put it above b
                  return -1;
                } else if (bIsTopProduct) {
                  // b is a top product, put it above a
                  return 1;
                } else {
                  // neither is a top product, sort by stock level
                  return a.units_in_stock - b.units_in_stock;
                }
              })

              .map((product, key) => {
                const isTopProduct = TopProducts.some(
                  (topProduct) => topProduct.product_id === product.product_id
                );
                const criticalStockLevel = isTopProduct ? 10 : 5;

                return (
                  <tr key={key} className={isTopProduct ? "top-product" : ""}>
                    <td>{product.product_id}</td>
                    <td>{product.product_name}</td>
                    <td className="php">
                      {parseFloat(product.unit_price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </td>
                    <td>
                      {product.description.length > 40
                        ? `${product.description.substring(0, 40)}...`
                        : product.description}
                    </td>
                    <td
                      className={`stock-quantity ${
                        product.units_in_stock < criticalStockLevel
                          ? "low-stock"
                          : ""
                      }`}
                    >
                      {product.units_in_stock}
                    </td>
                    <td>
                      <Link
                        to={`/Inventory/${product.product_id}`}
                        className="crud-buttons"
                      >
                        Edit
                      </Link>
                      &nbsp;
                      {authCookie === 1 && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this product?"
                              )
                            ) {
                              deleteProduct(product.product_id);
                            }
                          }}
                          className="crud-buttons-delete"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
