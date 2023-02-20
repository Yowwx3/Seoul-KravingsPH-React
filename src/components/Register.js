import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate the form inputs
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      // Send the data to the server
      axios
        .post("http://localhost/seoulkravingsAPI/Account.php/", inputs)
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === 1) {
            alert(response.data.message);
            navigate("/login");
          } else {
            alert(response.data.message);
          }
          //navigate("/login");
        });
    }
    // Hash the password
  };

  return (
    <section>
      <div className="container">
        <div className="user signinBx"></div>
        <div className="formBx">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Satisfy your K-Ravings!</h2>
            <h3>Register</h3>
            <input
              type="text"
              name="name"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <label className="data-privacy-checkbox">
              <input
                type="checkbox"
                name="dataPrivacy"
                onChange={handleChange}
                required
              />{" "}
              I have read the{" "}
              <Link to="/dataPrivacy" target="_blank" rel="noopener noreferrer">
                data privacy notice
              </Link>{" "}
              and consent to the given information being used.
            </label>

            <input type="submit" value="Sign up" />
            <p className="signup">
              Already have an account? <Link to="/Login">Signin</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
