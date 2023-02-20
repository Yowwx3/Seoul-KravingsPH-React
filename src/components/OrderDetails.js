import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetails() {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

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

  return (
    <div className="order-container">
      {orderDetails.length > 0 && (
        <>
          <h2>Order Details</h2>
          <h3>Order Details</h3>
          <p>Order ID: {orderDetails[0].order_id}</p>
          <p>Status: {orderDetails[0].status}</p>
          <p>Total: {orderDetails[0].total}</p>
          <p>Created At: {orderDetails[0].created_at}</p>

          <h3>Address Details</h3>
          <p>Full Name: {orderDetails[0].full_name}</p>
          <p>Street Address: {orderDetails[0].street_address}</p>
          <p>City: {orderDetails[0].city}</p>
          <p>Province: {orderDetails[0].province}</p>
          <p>Zip Code: {orderDetails[0].zip_code}</p>
          <p>Contact No: {orderDetails[0].contact_no}</p>

          <h3>Order Items</h3>
          {orderDetails.map((order, index) => (
            <div key={index}>
              <p>Product: {order.product_name}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Unit Price: {order.unit_price}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default OrderDetails;
