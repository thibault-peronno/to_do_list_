import "./login.scss";
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext, UserContext } from "../../App.jsx";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

function Login() {
  const { isLog, setIsLog } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPasswsord] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

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
    axiosInstance.post("auth/login", {
        identifiant: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setIsLog(true);
        setUser(response.data);
        console.log(response);
        console.log(isLog);
        navigate("/")
      })
      .catch(function (error) {
        console.log(error);
        if(error.response.status === 401){
          /** We do not display an explicite message, for do not give more information what the user need. Because that could be a hacker */
          setLoginError('Identifiant ou mot de passe incorrect');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false), setLoginError("");
          }, 5000);
        }
      });
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
            <img src="../assets/svg/linkedin.svg" alt="" className="icon"/>
            </Link>
            <Link to="https://github.com/thibault-peronno">
            <img src="../assets/svg/github.svg" alt="" className="icon"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
