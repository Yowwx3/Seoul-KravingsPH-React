import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddInventory() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);

  const { product_id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file, file.name);
    formData.append("product_id", product_id);

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
  };
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

  axios
    .get(`http://localhost/seoulkravingsAPI/?product_id=${product_id}`)
    .then((response) => {
      setImageUrl(response.data.image);
    })
    .catch((error) => {
      console.error(error);
    });

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
          <div>
            <h2>Edit Product</h2>

            <img
              src={`http://localhost/seoulkravingsAPI/${imageUrl}`}
              width="200"
            />
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
                <input type="file" onChange={handleImageChange} />
              </div>
            )}
            {file && <button onClick={handleUpload}>Upload</button>}
            {error && <div>{error.message}</div>}
          </div>
          <form onSubmit={handleSubmit}>
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

            <h3>Units in stock</h3>
            <input
              value={inputs.units_in_stock}
              type="number"
              name="units_in_stock"
              onChange={handleChange}
            ></input>
            <h3>Units on order</h3>
            <input
              value={inputs.units_on_order}
              type="number"
              name="units_on_order"
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
