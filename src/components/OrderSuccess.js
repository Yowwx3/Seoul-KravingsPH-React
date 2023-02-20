import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="order-success-container">
      <div className="order-success">
        <h1>Your order is successful.</h1>
        <h2>Thank you for ordering!</h2>
        <p>
          Please click{" "}
          <a href="/" onClick={handleClick}>
            here
          </a>{" "}
          if the page is not redirected within a few seconds
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;
