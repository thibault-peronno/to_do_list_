import { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasswsord] = useState("");

  const handleChangeFieldLogin = (value, name) => {
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPasswsord(value);
    }
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    console.log(email, password);
  };

  return (
    <section className="login">
      <div className="login_form">
        <div>
          <h1 className="login-form_h1">Ta liste de tâches</h1>
        </div>
        <div className="login_form-input">
          <h2 className="login_h2">Se connecter</h2>
          <form className="login_form" onSubmit={handleSubmitLogin}>
            <label htmlFor="email" className="login-form_label">
              Identifiant
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemple@gmail.com"
              className="login-form_input"
              value={email}
              onChange={(evt) =>
                handleChangeFieldLogin(evt.target.value, "email")
              }
            />
            <label htmlFor="Password" className="login-form_label">
              Mot de passe
            </label>
            <input
              id="Password"
              type="Password"
              placeholder="********"
              className="login-form_input"
              value={password}
              onChange={(evt) =>
                handleChangeFieldLogin(evt.target.value, "password")
              }
            />
            <button type="submit" className="login-form_btn">
              Se connnecter
            </button>
            <Link to='/register'><p>Se créer un compte</p></Link>
          </form>
        </div>
        <div className="login_footer">
          <p className="login_footer-text owner">Thibault PERONNO</p>
          <p className="login_footer-text">Pour le titre Concepteur et Développeur d'Application</p>
        </div>
      </div>
    </section>
  );
}

export default Login;
