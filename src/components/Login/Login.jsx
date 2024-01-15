import "./login.scss";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../App.jsx";
import AuthService from "../../services/auth.service.js";

function Login() {
  const authService = new AuthService();
  const { setIsLog } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChangeFieldLogin = (value, name) => {
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const handleSubmitLogin = async (evt) => {
    evt.preventDefault();

    try {
      const login = await authService.login(email, password);
      if (login.status == 200) {
        setIsLog(true);
        setUser(login.data);
        navigate("/");
      } else if (login.response.status === 401) {
        /** We do not display an explicite message, for do not give more information what the user need. Because that could be a hacker */
        setLoginError("Identifiant ou mot de passe incorrect");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setLoginError("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <div className="login_form">
        <div>
          <h1 className="login-form_h1">Ta liste de tâches</h1>
        </div>
        <div className="login_form-input">
          <h2 className="login_h2">Se connecter</h2>
          <p className={showMessage ? "displayErrorMessage" : "none"}>
            {loginError}
          </p>
          <form className="login-form" onSubmit={handleSubmitLogin}>
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
            <Link to="/register">
              <p>Se créer un compte</p>
            </Link>
          </form>
        </div>
        <div className="login_footer">
          <p className="login_footer-text owner">Thibault PERONNO</p>
          <p className="login_footer-text">
            Pour le titre Concepteur et Développeur d'Application
          </p>
          <div className="social-media">
            <Link to="https://www.linkedin.com/in/thibault-peronno/">
              <img src="../assets/svg/linkedin.svg" alt="" className="icon" />
            </Link>
            <Link to="https://github.com/thibault-peronno">
              <img src="../assets/svg/github.svg" alt="" className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
