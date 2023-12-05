import { useState } from "react";
import "./login.scss";

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
          <h1>Ta liste de tâches</h1>
        </div>
        <div>
          <h2 className="login_h2">Se connecter</h2>
          <form className="login_form" onSubmit={handleSubmitLogin}>
            <label htmlFor="email" className="login-form_label">
              Identifiant
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ton e-mail"
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
              placeholder="Ton mot de passe"
              className="login-form_input"
              value={password}
              onChange={(evt) =>
                handleChangeFieldLogin(evt.target.value, "password")
              }
            />
            <button type="submit" className="login-form_btn">
              Se connnecter
            </button>
            <p>Se créer un compte</p>
          </form>
        </div>
      </div>
      <div>
        <p>Thibault PERONNO</p>
        <p>Pour le titre Concepteur et Développeur d'Application</p>
      </div>
    </section>
  );
}

export default Login;
