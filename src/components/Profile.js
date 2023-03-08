import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    localStorage.removeItem("cart");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.open("http://localhost:3000/", "_self");
    }
  }

  const navigate = useNavigate();

  return (
    <div className="profile">
      <button onClick={() => navigate("/User/Order")}>Orders</button>
      <button onClick={deleteAllCookies}>Logout</button>
    </div>
  );
}

export default Profile;
