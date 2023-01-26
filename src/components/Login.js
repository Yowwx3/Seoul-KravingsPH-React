import { Link } from "react-router-dom";
import img1 from "../images/about-us-img1.png";
function Login() {
  return (
    <section>
      <div className="container">
        <div class="user signinBx"></div>
        <div class="formBx">
          <form className="login-form" action="" onSubmit="return false;">
            <h2>Satisfy your K-Ravings!</h2>
            <h3>Login</h3>
            <input type="email" name="" placeholder="Email" />
            <input type="password" name="" placeholder="Password" />
            <input type="submit" name="" value="Log in" />
            <p class="signup">
              Don't have an account? <Link to="/Register">signup.</Link>
            </p>
          </form>
        </div>{" "}
      </div>
    </section>
  );
}

export default Login;
