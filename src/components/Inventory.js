import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios
      .get("http://test1domain.infinityfreeapp.com/seoulkravingsAPI/")
      .then(function (response) {
        console.log(response.data);
        setProducts(response.data);
      });
  }
  const deleteProduct = (product_id) => {
    axios
      .delete(
        `http://test1domain.infinityfreeapp.com/seoulkravingsAPI/?product_id=${product_id}`
      )
      .then(function (response) {
        console.log(response.data);
        getProducts();
      });
  };
  return (
    <div className="InventoryList">
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
          {products.map((product, key) => (
            <tr key={key}>
              <td>{product.product_name}</td>
              <td>{product.unit_price}</td>
              <td>{product.description}</td>
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
