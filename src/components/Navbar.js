import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

function Navbar() {
  const token = Cookie.get("token");
  const email = Cookie.get("email");
  const username = Cookie.get("username");
  const authCookie = Cookie.get("auth");

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const hideNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };
  return (
    <header>
      <h3>SEOUL K-RAVINGS PH</h3>
      <nav ref={navRef}>
        <Link to="/" onClick={hideNavbar}>
          Home
        </Link>
        <Link to="/Products" onClick={hideNavbar}>
          Products
        </Link>
        <Link to="/About Us" onClick={hideNavbar}>
          About Us
        </Link>
        {authCookie ? (
          <>
            <Link to="/Cart" onClick={hideNavbar}>
              Cart
            </Link>
            <Link to="/Profile" onClick={hideNavbar}>
              Profile
            </Link>
          </>
        ) : (
          <Link to="/Login" onClick={hideNavbar}>
            Login
          </Link>
        )}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
