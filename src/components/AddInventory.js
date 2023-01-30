import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddInventory() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost/seoulkravingsAPI/", inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/Inventory");
      });
  };

  return (
    <section>
      <div className="container-crud">
        <div className="formBx-crud">
          <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <h3>Product Name</h3>
            <input
              type="text"
              name="product_name"
              onChange={handleChange}
              required
            ></input>
            <h3>Description</h3>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              required
            ></input>
            <h3>Price</h3>
            <input
              type="number"
              name="unit_price"
              onChange={handleChange}
              required
            ></input>
            <input type="submit" value="Save"></input>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddInventory;
