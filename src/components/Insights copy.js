import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";

const currentYear = new Date().getFullYear();

function Product({ name, quantity, image }) {
  return (
    <div className="col2-div">
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/monitor.php")
      .then((response) => {
        console.log("Sales response:", response.data);
        setSales(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/insights.php")
      .then((response) => {
        console.log("Orders response:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Group sales by date
  const salesByDate = {};
  sales.forEach((sale) => {
    const date = new Date(sale.created_at).toLocaleDateString();
    if (!salesByDate[date]) {
      salesByDate[date] = 0;
    }
    salesByDate[date] += parseFloat(sale.total);
  });

  // Convert sales by date object to array of data points
  const salesData = {
    labels: Object.keys(salesByDate),
    datasets: [
      {
        label: "Sales",
        data: Object.values(salesByDate),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="top-selling-container">
      <div className="row1">
        {" "}
        <div className="col1">
          {" "}
          <h1>Activity Summary</h1>
          <div className="col1-div">
            <h3 className="filter-h3" onClick={toggleDropdown}>
              Filter by:
            </h3>
            {isDropdownOpen && (
              <div className="insights-options">
                <p>Past 7 days</p>
                <p>Past 30 days</p>
                <p>{currentYear}</p>
                <p>{currentYear - 1}</p>
                <h5>From</h5>
                <input name="from" type="date" />
                <h5>To</h5>
                <input name="to" type="date" />
              </div>
            )}
          </div>
          <Line data={salesData} />
        </div>
      </div>

      <div className="col2">
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
