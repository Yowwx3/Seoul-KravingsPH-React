import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios.get("http://localhost/seoulkravingsAPI/").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  }
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
              <td>{product.units_in_stock}</td>
              <td>{product.units_on_order}</td>
              <td>
                <Link
                  to={"product/${product.id}/edit"}
                  className="crud-buttons"
                >
                  Edit
                </Link>
                &nbsp;
                <button className="crud-buttons-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
