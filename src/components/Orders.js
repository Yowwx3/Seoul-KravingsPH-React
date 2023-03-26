import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
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

  console.log("Orders:", orders);

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
    navigate(`/Orders/${order_id}`);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  let filteredOrders = orders;
  if (selectedFilter === "Processing") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === "Processing"
    );
  } else if (selectedFilter === "Shipped") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === "Shipped"
    );
  } else if (selectedFilter === "Delayed") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === "Delayed"
    );
  }

  if (searchTerm !== "") {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.order_id.toString().includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearFilter = () => {
    setSelectedFilter("");
  };

  return (
    <div className="orders-container">
      {selectedFilter ? (
        <h1>Orders - {selectedFilter}</h1>
      ) : (
        <h1>Orders - All</h1>
      )}

      <div className="orders-filter">
        <h3
          className={selectedFilter === "" ? "active-filter" : ""}
          onClick={() => handleClearFilter()}
        >
          All Orders
        </h3>
        <h3
          className={selectedFilter === "Processing" ? "active-filter" : ""}
          onClick={() => handleFilterClick("Processing")}
        >
          Processing
        </h3>
        <h3
          className={selectedFilter === "Shipped" ? "active-filter" : ""}
          onClick={() => handleFilterClick("Shipped")}
        >
          Shipped
        </h3>
        <h3
          className={selectedFilter === "Delayed" ? "active-filter" : ""}
          onClick={() => handleFilterClick("Delayed")}
        >
          Delayed
        </h3>
        <h3
          onClick={() => navigate("/Order-Canceled")}
          className="cancel-filter"
        >
          Canceled
        </h3>
      </div>

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
          .filter(
            (order) =>
              order.status !== "Completed" && order.status !== "Canceled"
          )

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
                  Total:{" "}
                  {parseFloat(order.total).toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </p>
                <p>
                  Order Date: {new Date(order.created_at).toLocaleDateString()}
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
    </div>
  );
}

export default Orders;
