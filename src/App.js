import "./styles/Main.css";
import "./styles/Login.css";
import "./styles/Admin.css";
import "./styles/products.css";
import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Product from "./components/Product";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import AddInventory from "./components/AddInventory";
import Sales from "./components/Sales";
import Inventory from "./components/Inventory";
import EditInventory from "./components/EditInventory";
import Insights from "./components/Insights";
import { Route, Routes, useParams } from "react-router-dom";
import PrivacyNotice from "./components/PrivacyNotice";
import Cookie from "js-cookie";
import { HmacSHA256 } from "crypto-js";

function App() {
  const token = Cookie.get("token");
  const email = Cookie.get("email");
  const username = Cookie.get("username");
  const secretKey = "hellohello123";
  const authCookie = Cookie.get("auth");

  const decryptedAuth = HmacSHA256(authCookie, secretKey).toString();
  console.log(decryptedAuth);

  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        {authCookie === "1" && <Admin />}
        <Routes>
          <Route
            path="/"
            element={
              <Home name={username || ""}>
                <p>{username ? `Welcome Back!` : "Welcome!"}</p>
              </Home>
            }
          />
          <Route path="/Products" element={<Products />} />
          <Route path="/Product/:product_id" element={<Product />} />
          <Route path="/About Us" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          {authCookie === "1" && (
            <>
              <Route path="/Sales" element={<Sales />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route
                path="/Inventory/:product_id"
                element={<EditInventory />}
              />
              <Route path="/AddInventory" element={<AddInventory />} />
              <Route path="/Insights" element={<Insights />} />
            </>
          )}
          <Route path="/dataPrivacy" element={<PrivacyNotice />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
