import "./styles/Main.css";
import "./styles/Login.css";
import "./styles/Admin.css";
import "./styles/products.css";
import "./styles/orders.css";
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
import SalesDetails from "./components/SalesDetails";
import Inventory from "./components/Inventory";
import EditInventory from "./components/EditInventory";
import Insights from "./components/Insights";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PrivacyNotice from "./components/PrivacyNotice";
import OrderSuccess from "./components/OrderSuccess";
import Orders from "./components/Orders";
import OrderDetails from "./components/OrderDetails";
import Cancel from "./components/Cancel";
import Order from "./components/Order";
import OrderDetailsCus from "./components/OrderDetailsCust";
import React from "react";
import Cookie from "js-cookie";
import { Route, Routes } from "react-router-dom";

function App() {
  const email = Cookie.get("email");
  const username = Cookie.get("username");
  const secretKey = "hellohello123";
  const authCookie = Cookie.get("auth");

  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        {(authCookie === "1" || authCookie === "2") && <Admin />}
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
          <Route path="/dataPrivacy" element={<PrivacyNotice />} />

          <Route path="/Profile" element={<Profile />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/OrderSuccess" element={<OrderSuccess />} />
          <Route path="/User/Order" element={<Order />} />
          <Route path="/User/Order/:order_id" element={<OrderDetailsCus />} />

          {(authCookie === "1" || authCookie === "2") && (
            <>
              <Route path="/Sales" element={<Sales />} />
              <Route path="/Sales/:order_id" element={<SalesDetails />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route
                path="/Inventory/:product_id"
                element={<EditInventory />}
              />
              <Route path="/AddInventory" element={<AddInventory />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/Orders/:order_id" element={<OrderDetails />} />
              <Route path="/Order-Canceled" element={<Cancel />} />
              <Route path="/Insights" element={<Insights />} />
            </>
          )}
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
