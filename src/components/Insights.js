import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Product({ name, quantity, image }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Total Quantity Sold: {quantity}</p>
      <img
        className="top-image"
        src={`http://localhost/seoulkravingsAPI/${image}`}
      />
    </div>
  );
}

function Insights() {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/insights.php")
      .then((response) => {
        console.log("Orders response:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="top-selling-container">
      <div>
        {" "}
        <h1>Top Selling Products</h1>
        {Products.map((product) => (
          <Product
            key={product.product_id}
            name={product.product_name}
            quantity={product.total_quantity}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Insights;
