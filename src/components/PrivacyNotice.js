import React from "react";
import Footer from "./Footer";

const PrivacyNotice = () => {
  const handleEmailClick = () => {
    window.open("mailto:seoulkravingsph@gmail.com", "_blank");
  };
  return (
    <div className="privacy-notice">
      <div>
        <h1>Data Privacy Notice</h1>
        <h3>
          We, at Seoul K-Ravings PH, are committed to protecting your personal
          data in accordance with the Data Privacy Act of 2012. In this notice,
          we will inform you of the types of personal data that we collect, how
          we use it, and your rights in relation to your personal data.
        </h3>
        <p>Types of Personal Data We Collect</p>
        <ul>
          <li>Full name</li>
          <li>Contact details (e.g. email address, phone number)</li>
          <li>Demographic information (e.g. age, gender)</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
        <h2>How We Use Your Personal Data</h2>
        <p>We use your personal data for the following purposes:</p>
        <ul>
          <li>To provide and improve our products and services</li>
          <li>To send you promotional emails and/or text messages</li>
          <li>To personalize your experience</li>
          <li>To conduct research and analysis</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>
        <h2>Your Rights</h2>
        <p>Under the Data Privacy Act of 2012, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct any inaccuracies in your personal data</li>
          <li>Request for the deletion of your personal data</li>
          <li>Object to the processing of your personal data</li>
          <li>
            File a complaint with the National Privacy Commission if you believe
            your rights have been violated
          </li>
        </ul>
        <p>
          If you have any questions or concerns about our data privacy notice,
          please contact us at{" "}
          <a style={{ cursor: "pointer" }} onClick={handleEmailClick}>
            seoulkravingsph@gmail.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyNotice;
