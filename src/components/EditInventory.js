import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddInventory() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const { product_id } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  function getProduct() {
    axios
      .get(`http://localhost/seoulkravingsAPI/?product_id=${product_id}`)
      .then(function (response) {
        console.log(response.data);
        setInputs(response.data);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `http://localhost/seoulkravingsAPI/?product_id=${product_id}`,
        inputs
      )
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
            <h2>Edit Product</h2>
            <h3>Product Name</h3>
            <input
              value={inputs.product_name}
              type="text"
              name="product_name"
              onChange={handleChange}
            ></input>
            <h3>Description</h3>
            <input
              value={inputs.description}
              type="text"
              name="description"
              onChange={handleChange}
            ></input>
            <h3>Price</h3>

            <input
              value={inputs.unit_price}
              type="number"
              name="unit_price"
              onChange={handleChange}
            ></input>
            <input type="submit" value="Save"></input>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddInventory;
