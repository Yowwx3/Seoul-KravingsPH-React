import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

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
    navigate(`/Sales/${order_id}`);
  };

  return (
    <div className="orders-container">
      <h1>Orders - Canceled</h1>
      <div className="orders-filter">
        {" "}
        <h3 onClick={() => navigate("/Orders")}>Back</h3>
      </div>
      {selectedImage && <Modal />}
      <ul>
        {orders
          .filter((order) => order.status === "Canceled")
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
                <p>Total: ₱{order.total}</p>
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

export default Cancel;
