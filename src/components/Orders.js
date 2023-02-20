import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Orders() {
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

  const handleImageClick = (paymentProof) => {
    setSelectedImage(paymentProof);
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

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {selectedImage && <Modal />}
      <ul>
        {orders.map((order) => (
          <li
            key={order.order_id}
            onClick={() => handleDetails(order.order_id)}
          >
            <div>
              {" "}
              <p>Order ID: {order.order_id}</p>
              <p>Address ID: {order.address_id}</p>
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
              onClick={() => handleImageClick(order.payment_proof)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
