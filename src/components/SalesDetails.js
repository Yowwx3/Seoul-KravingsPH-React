import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function SalesDetails() {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost/seoulkravingsAPI/monitor.php/?order_id=${order_id}`
      )
      .then(function (response) {
        setOrderDetails(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [order_id]);

  useEffect(() => {
    if (orderDetails.length > 0) {
      const total = orderDetails[0].total;
      const itemsPrice = orderDetails.reduce(
        (acc, curr) => acc + curr.unit_price * curr.quantity,
        0
      );
      const shippingFee = total - itemsPrice;
      setShippingFee(shippingFee);
    }
  }, [orderDetails]);

  const handleImageClick = (paymentProof) => {
    setSelectedImage(paymentProof);
  };

  const handleCloseModal = () => {
    setSelectedImage("");
  };

  const handleStatusUpdate = () => {
    axios
      .put(
        `http://localhost/seoulkravingsAPI/monitor.php/?order_id=${order_id}`,
        {
          status: updatedStatus,
        }
      )
      .then(function (response) {
        console.log(updatedStatus);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  return (
    <div className="order-container">
      {orderDetails.length > 0 && (
        <>
          {selectedImage && <Modal />}
          <div className="order-details">
            {" "}
            <div>
              <h3>Order Details</h3>
              <p>Order ID: {orderDetails[0].order_id}</p>
              <p>Email: {orderDetails[0].email}</p>
              <p>Total: ₱{orderDetails[0].total}</p>
              <p>
                Order Date:{" "}
                {new Date(orderDetails[0].created_at).toLocaleDateString()}
              </p>
              <div className="column">
                <p>
                  Status:{orderDetails[0].status} on{" "}
                  {new Date(orderDetails[0].updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <img
              className="payment-proof-img"
              src={`http://localhost/seoulkravingsAPI/${orderDetails[0].payment_proof}`}
              alt="Payment Proof"
              onClick={() => handleImageClick(orderDetails[0].payment_proof)}
            />
          </div>

          <div className="order-details-2">
            {" "}
            <div className="address-details">
              <h3 className="h3-2">Address Details</h3>
              <p>Full Name: {orderDetails[0].full_name}</p>
              <p>Street Address: {orderDetails[0].street_address}</p>
              <p>City: {orderDetails[0].city}</p>
              <p>Province: {orderDetails[0].province}</p>
              <p>Zip Code: {orderDetails[0].zip_code}</p>
              <p>Contact No: {orderDetails[0].contact_no}</p>
              <hr />
              <h3 className="h3-2">Ordered Items</h3>
              <div className="Ordered-Item-Container"></div>{" "}
              {orderDetails.map((order, index) => (
                <div className="Ordered-Item" key={index}>
                  <div className="Ordered-Item-Name">
                    {" "}
                    <p>Product: {order.product_name}</p>
                    <p>Price: ₱ {order.unit_price * order.quantity}</p>
                  </div>
                  <div className="Ordered-Item-Price">
                    {" "}
                    <p>Quantity: {order.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="order-total">
                {" "}
                <hr />
                <p>Shipping Fee: ₱{shippingFee.toFixed(2)}</p>
                <h3>Total: ₱{orderDetails[0].total}</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SalesDetails;
