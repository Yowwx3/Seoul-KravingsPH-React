import React from "react";
import "../styles/Footer.css";

function Footer() {
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/seoulkravingsph", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/seoulkravingsph", "_blank");
  };

  const handleEmailClick = () => {
    window.open("mailto:seoulkravingsph@gmail.com", "_blank");
  };

  const handlePhoneClick = () => {
    navigator.clipboard.writeText("0945 153 9568");
    window.alert("Phone number saved to clipboard!");
  };

  return (
    <footer>
      <ul>
        <li>
          <a style={{ cursor: "pointer" }} onClick={handleFacebookClick}>
            Facebook
          </a>
        </li>
        <li>
          <a style={{ cursor: "pointer" }} onClick={handleInstagramClick}>
            Instagram
          </a>
        </li>
        <li>
          <a style={{ cursor: "pointer" }} onClick={handleEmailClick}>
            Email
          </a>
        </li>
        <li>
          <a style={{ cursor: "pointer" }} onClick={handlePhoneClick}>
            Telephone No.
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
