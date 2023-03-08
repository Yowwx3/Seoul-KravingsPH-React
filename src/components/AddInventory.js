import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddInventory() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file, file.name);

    axios
      .post("http://localhost/seoulkravingsAPI/", inputs, formData)
      .then(function (response) {
        console.log(response.data);
        const formData = new FormData();
        formData.append("image", file, file.name);

        axios
          .post(`http://localhost/seoulkravingsAPI/imageupload.php`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.status == 0) {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            setError(error);
          });
        setImagePreview(null);
        setFile(null);
        navigate("/Inventory");
      });
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFile(null);
  };

  return (
    <section>
      <div className="container-crud">
        <div className="formBx-crud">
          <h3 onClick={() => navigate("/Inventory")} className="cancel-filter2">
            Back
          </h3>
          <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            {imagePreview ? (
              <div>
                <br />
                <h5>Preview</h5> <br />
                <img src={imagePreview} width="200" />
                <br />
                <button onClick={handleRemoveImage}>Change Image</button>
              </div>
            ) : (
              <div>
                <input required type="file" onChange={handleImageChange} />
              </div>
            )}
            {error && <div>{error.message}</div>}
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
            <h3>Units in stock</h3>
            <input
              value={inputs.units_in_stock}
              type="number"
              name="units_in_stock"
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
