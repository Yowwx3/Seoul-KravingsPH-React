import "./styles/Main.css";
import "./styles/Login.css";
import "./styles/Admin.css";
import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import AddInventory from "./components/AddInventory";
import Sales from "./components/Sales";
import Inventory from "./components/Inventory";
import Insights from "./components/Insights";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        <Admin />
        <Routes>
          <Route
            path="/"
            element={
              <Home name="Angelo">
                <p>Welcome Back!</p>
              </Home>
            }
          />
          <Route path="/Products" element={<Products />} />
          <Route path="/About Us" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Sales" element={<Sales />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/AddInventory" element={<AddInventory />} />
          <Route path="/Insights" element={<Insights />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
