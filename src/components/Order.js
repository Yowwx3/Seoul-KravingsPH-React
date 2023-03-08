import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";

function Order() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("Processing");

  const authCookie = Cookie.get("id");
  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/customer.php")
      .then((response) => {
        console.log("Orders response:", response.data);
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFilterClick = (filter) => {
    if (filter === "To Ship") {
      setSelectedFilter("Processing");
    } else if (filter === "To Receive") {
      setSelectedFilter("To Receive");
    } else {
      setSelectedFilter(filter);
    }
  };

  console.log("Orders:", orders);
  console.log("account id:", authCookie);

  const handleDetails = (order_id) => {
    navigate(`/User/Order/${order_id}`);
  };

  return (
    <div className="orders1-container">
      {selectedFilter ? <h1>Orders - {selectedFilter}</h1> : <h1>Orders</h1>}
      <div className="orders-filter">
        <h3
          className={selectedFilter === "Processing" ? "active-filter" : ""}
          onClick={() => handleFilterClick("To Ship")}
        >
          To Ship
        </h3>
        <h3
          className={selectedFilter === "To Receive" ? "active-filter" : ""}
          onClick={() => handleFilterClick("To Receive")}
        >
          To Receive
        </h3>
        <h3
          className={selectedFilter === "Completed" ? "active-filter" : ""}
          onClick={() => handleFilterClick("Completed")}
        >
          Completed
        </h3>
        <h3
          className={selectedFilter === "Canceled" ? "active-filter" : ""}
          onClick={() => handleFilterClick("Canceled")}
        >
          Canceled
        </h3>
      </div>
      <ul>
        {orders.filter(
          (order) =>
            order.account_id === parseInt(authCookie, 10) &&
            (selectedFilter === "To Receive"
              ? order.status === "Delayed" || order.status === "Shipped"
              : order.status === selectedFilter)
        ).length === 0 ? (
          <div className="no-orders-yet">
            {" "}
            <p>No orders yet.</p>
          </div>
        ) : (
          orders
            .filter(
              (order) =>
                order.account_id === parseInt(authCookie, 10) &&
                (selectedFilter === "To Receive"
                  ? order.status === "Delayed" || order.status === "Shipped"
                  : order.status === selectedFilter)
            )
            .map((order) => (
              <li
                key={order.order_id}
                onClick={() => handleDetails(order.order_id)}
              >
                <div>
                  <p>Order ID: {order.order_id}</p>
                  <p>Status: {order.status}</p>
                  <p>Total: ₱{order.total}</p>

                  <p>
                    Order Date:{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  {" "}
                  <p>{order.product_name}</p>
                  <img
                    className="order-img"
                    src={`http://localhost/seoulkravingsAPI/${order.image}`}
                  />
                  {order.ordered_items - 1 > 0 ? (
                    <p className="items-count">
                      {order.ordered_items - 1} more{" "}
                      {order.ordered_items - 1 === 1 ? "item" : "items"}
                    </p>
                  ) : null}
                </div>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default Order;
