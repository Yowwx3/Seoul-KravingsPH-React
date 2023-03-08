import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

function Navbar() {
  const token = Cookie.get("token");
  const email = Cookie.get("email");
  const username = Cookie.get("username");
  const authCookie = Cookie.get("auth");

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    localStorage.removeItem("cart");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.open("http://localhost:3000/", "_self");
  }

  const navRef = useRef();
  const [showDropdown, setShowDropdown] = useState(true);

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
            <div className="dropdown-container">
              <div className="dropdown">
                <div className="profile-link">Profile</div>
                {showDropdown && (
                  <div className="dropdown-list">
                    <Link onClick={deleteAllCookies}>Logout</Link>
                    <Link to="/User/Order" onClick={hideNavbar}>
                      Orders
                    </Link>
                    <Link to="/Cart" onClick={hideNavbar}>
                      Cart
                    </Link>
                  </div>
                )}
              </div>
            </div>
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
