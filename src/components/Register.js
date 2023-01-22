import { Link } from "react-router-dom";

function Register() {
  return (
    <section>
      <div className="container">
        <div class="user signinBx"></div>
        <div class="formBx">
          <form className="login-form" action="" onsubmit="return false;">
            <h2>Satisfy your K-Ravings!</h2>
            <h3>Register</h3>
            <input type="text" name="" placeholder="Name" />
            <input type="email" name="" placeholder="Email" />
            <input type="password" name="" placeholder="Password" />
            <input type="submit" name="" value="Register" />
            <p class="signup">
              Already have an account? <Link to="/Login">signin.</Link>
            </p>
          </form>
        </div>{" "}
      </div>
    </section>
  );
}

export default Register;
