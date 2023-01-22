import img1 from "../images/about-us-img1.png";
import Footer from "./Footer";

function About() {
  return (
    <div className="about-us-container">
      <h1 className="About-us">About Us</h1>
      <p className="about-us-paragraph">
        We are Seoul K-Ravings PH and we are here to satisfy your K-ravings!
        Seoul K-Ravings PH is your source for everything you need to know about
        korean food. We are committed to giving you the best noodles, drinks,
        ice cream, snacks, etc.
      </p>
      <img className="about-img" src={img1} />
      <p className="about-us-paragraph">
        Our journey began with a passion for Korean drama and TV series, which
        motivated us to start our own business. From humble beginnings, we have
        grown into a thriving online store, available on Facebook, Instagram,
        and Shopee. You can also visit us in person or place an order online.We
        are proud to be a part of the unique and wonderful world of Korean
        retail and are committed to delivering an excellent experience for all
        of our customers. Thank you for choosing Seoul K-Ravings PH!
      </p>
      <Footer />
    </div>
  );
}

export default About;
