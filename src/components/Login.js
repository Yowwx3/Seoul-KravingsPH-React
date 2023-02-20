import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Cookie from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth] = useState();
  const [token] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/seoulkravingsAPI/Auth.php/", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 1) {
          Cookie.set("token", response.data.token);
          Cookie.set("email", response.data.email);
          Cookie.set("username", response.data.name);
          Cookie.set("auth", response.data.auth);
          Cookie.set("id", response.data.account_id);
          window.open("http://localhost:3000/", "_self");
        } else {
          console.log("Login failed: " + response.data.message);
        }
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <section>
      <div className="container">
        <div className="user signinBx"></div>
        <div className="formBx">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Satisfy your K-Ravings!</h2>
            <h3>Login</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <input type="submit" value="Log in" />
            <p className="signup">
              Don't have an account? <Link to="/Register">signup.</Link>
            </p>
            <p className="signup">
              Forgot password? <Link to="">click here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
