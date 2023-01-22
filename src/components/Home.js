import { useState } from "react";

function Home(props) {
  const [greet, setHome] = useState("Annyeonghaseyo " + props.name + "!!");
  return (
    <div className="greet-text">
      <h1>{greet}</h1>
      {props.children}
      <h1 className="tagline-text">
        Satisfy your <br /> K-Ravings
      </h1>
    </div>
  );
}

export default Home;
