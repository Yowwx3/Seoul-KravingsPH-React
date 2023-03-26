import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Sales() {
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/monitor.php")
      .then((response) => {
        console.log("Orders response:", response.data);
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/sales.php")
      .then((response) => {
        console.log("Sales response:", response.data);
        setSales(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("sales:", orders);

  const handleImageClick = (paymentProof, event) => {
    setSelectedImage(paymentProof);
    event.stopPropagation();
  };

  const handleCloseModal = () => {
    setSelectedImage("");
  };

  const Modal = () => {
    return (
      <div onClick={handleCloseModal} className="modal2">
        <div className="modal-content2">
          <img
            className="modal-image2"
            src={`http://localhost/seoulkravingsAPI/${selectedImage}`}
            alt="Payment Proof"
          />
        </div>
      </div>
    );
  };

  const handleDetails = (order_id) => {
    navigate(`/Sales/${order_id}`);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.order_id.toString().includes(searchTerm) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="orders-container">
      <div className="InventoryList">
        <div>
          <h1>Sales</h1>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th className="php">Unit Price</th>
                <th>Quantity Sold</th>
                <th className="php">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.product_id}>
                  <td>{sale.product_id}</td>
                  <td>{sale.product_name}</td>
                  <td className="php">
                    {parseFloat(sale.unit_price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </td>

                  <td>{sale["Quantity Sold"]}</td>
                  <td className="php">
                    {parseFloat(
                      sale.unit_price * sale["Quantity Sold"]
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Sales Receipts</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by Order ID or Email"
            />
          </div>
          {selectedImage && <Modal />}
          <ul>
            {filteredOrders
              .filter((order) => order.status === "Completed")
              .map((order) => (
                <li
                  key={order.order_id}
                  onClick={() => handleDetails(order.order_id)}
                >
                  <div>
                    {" "}
                    <p>Order ID: {order.order_id}</p>
                    <p>Email: {order.email}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Total:
                      {parseFloat(order.total).toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </p>{" "}
                    <p>
                      Order Date:{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <img
                    className="payment-proof-img"
                    src={`http://localhost/seoulkravingsAPI/${order.payment_proof}`}
                    alt="Payment Proof"
                    onClick={(event) =>
                      handleImageClick(order.payment_proof, event)
                    }
                  />
                </li>
              ))}
          </ul>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Sales;
