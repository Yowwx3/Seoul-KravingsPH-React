import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js/auto";

function Product({ name, quantity, image, unit_price }) {
  const totalPrice = quantity * unit_price;
  const formattedPrice = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <div className="col2-div">
      <h3>{name}</h3>
      <p>Total Quantity Sold: {quantity}</p>
      <p>Total Sales {formattedPrice}</p>
      <img
        className="top-image"
        src={`http://localhost/seoulkravingsAPI/${image}`}
      />
    </div>
  );
}

function Insights() {
  const canvasRef = useRef(null);
  const monthCanvasRef = useRef(null);
  const weekCanvasRef = useRef(null);
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost/seoulkravingsAPI/insights.php")
      .then((response) => {
        console.log("Orders response:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const completedSales = sales.filter((sale) => sale.status === "Completed");

  const totalSales = completedSales.reduce(
    (total, completedSale) => total + parseFloat(completedSale.total),
    0
  );

  const formattedTotalSales = totalSales.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const averageSales = totalSales / completedSales.length;

  const formatedAverageSales = averageSales.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentWeek = Math.floor(
    (currentDate.getDate() - currentDate.getDay() + 12) / 7
  );

  const monthlySales = completedSales.filter(
    (sale) => new Date(sale.created_at).getMonth() === currentMonth
  );

  const weeklySales = completedSales.filter(
    (sale) =>
      Math.floor(
        (new Date(sale.created_at).getDate() -
          new Date(sale.created_at).getDay() +
          12) /
          7
      ) === currentWeek
  );

  const monthlyAvgSales =
    monthlySales.reduce(
      (total, completedSale) => total + parseFloat(completedSale.total),
      0
    ) / monthlySales.length;

  const weeklyAvgSales =
    weeklySales.reduce(
      (total, completedSale) => total + parseFloat(completedSale.total),
      0
    ) / weeklySales.length;

  const formatedMonthlyAvgSales = monthlyAvgSales.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const formatedWeeklyAvgSales = weeklyAvgSales.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const totalWeeklySales = weeklySales.reduce(
    (total, weeklySale) => total + parseFloat(weeklySale.total),
    0
  );

  const totalMonthlySales = monthlySales.reduce(
    (total, monthlySale) => total + parseFloat(monthlySale.total),
    0
  );

  const formatedTotalMonthlySales = totalMonthlySales.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const formatedTotalWeeklySales = totalWeeklySales.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      const salesData = completedSales
        .map((sale) => ({
          x: new Date(sale.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          y: parseFloat(sale.total),
          createdAt: sale.created_at,
        }))
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "Sale",
              data: salesData,
              backgroundColor: "pink",
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });

      return () => {
        chart.destroy();
      };
    }
  }, [sales]);

  useEffect(() => {
    if (monthCanvasRef.current) {
      const ctx = monthCanvasRef.current.getContext("2d");

      const salesData = monthlySales
        .map((sale) => ({
          x: new Date(sale.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          y: parseFloat(sale.total),
          createdAt: sale.created_at,
        }))
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "Sale",
              data: salesData,
              backgroundColor: "pink",
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });

      return () => {
        chart.destroy();
      };
    }
  }, [sales]);

  useEffect(() => {
    if (weekCanvasRef.current) {
      const ctx = weekCanvasRef.current.getContext("2d");

      const salesData = weeklySales
        .map((sale) => ({
          x: new Date(sale.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          y: parseFloat(sale.total),
          createdAt: sale.created_at,
        }))
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "Sale",
              data: salesData,
              backgroundColor: "pink",
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });

      return () => {
        chart.destroy();
      };
    }
  }, [sales]);

  return (
    <div className="top-selling-container">
      <div className="row1">
        {" "}
        <div className="col1">
          {" "}
          <div className="total-average">
            {" "}
            <h2>
              AVG Sales{" "}
              <p>
                total{" "}
                <span style={{ color: "red" }}>{formatedAverageSales}</span>
              </p>
            </h2>
            <h2>
              AVG Sales{" "}
              <p>
                by month{" "}
                <span style={{ color: "red" }}>{formatedMonthlyAvgSales}</span>
              </p>
            </h2>
            <h2>
              AVG Sales{" "}
              <p>
                by week{" "}
                <span style={{ color: "red" }}>{formatedWeeklyAvgSales}</span>
              </p>
            </h2>
          </div>
        </div>
        <div className="col1">
          {" "}
          <h1>
            Total Sales{" "}
            <p>
              {" "}
              <span style={{ color: "red" }}>{formattedTotalSales}</span>
            </p>
          </h1>
          <canvas className="chart" ref={canvasRef}></canvas>
          <h1>
            Month Sales{" "}
            <p>
              {" "}
              <span style={{ color: "red" }}>{formatedTotalMonthlySales}</span>
            </p>
          </h1>
          <canvas className="chart" ref={monthCanvasRef}></canvas>
          <h1>
            Week Sales{" "}
            <p>
              {" "}
              <span style={{ color: "red" }}>{formatedTotalWeeklySales}</span>
            </p>
          </h1>
          <canvas className="chart" ref={weekCanvasRef}></canvas>
        </div>
      </div>
      <div className="row1">
        <div className="col2">
          {" "}
          <h1>Top Selling Products</h1>
          {Products.map((product) => (
            <Product
              key={product.product_id}
              name={product.product_name}
              unit_price={product.unit_price}
              quantity={product.total_quantity}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Insights;
