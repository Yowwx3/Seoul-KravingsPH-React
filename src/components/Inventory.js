import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

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
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by product name"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Description</th>
            <th>Stocks</th>
            <th>Ordered</th>
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
            .map((product, key) => (
              <tr key={key}>
                <td>{product.product_name}</td>
                <td>{product.unit_price}</td>
                <td>
                  {product.description.length > 40
                    ? `${product.description.substring(0, 40)}...`
                    : product.description}
                </td>
                <td className={product.units_in_stock < 5 ? "low-stock" : ""}>
                  {product.units_in_stock}
                </td>
                <td>{product.units_on_order}</td>
                <td>
                  <Link
                    to={`/Inventory/${product.product_id}`}
                    className="crud-buttons"
                  >
                    Edit
                  </Link>
                  &nbsp;
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
