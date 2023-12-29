import "./register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterService from "../../services/register.service.js";

function RegisterPage() {
  const registerService = new RegisterService();
  const [registerFirstname, setRegisterFirstname] = useState("");
  const [registerLastname, setRegisterLastname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setPasswsord] = useState("");
  const [registerError, setRegisterError] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [emailExist, setEmailExist] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleChangeRegisterFields = (value, name) => {
    if (name == "firstname") {
      setRegisterFirstname(value);
    } else if (name == "lastname") {
      setRegisterLastname(value);
    } else if (name == "email") {
      setRegisterEmail(value);
    } else if (name == "password") {
      setPasswsord(value);
    }
  };

  const handleSubmitRegister = async (evt) => {
    evt.preventDefault();
    const newUser = {
      firstname: registerFirstname,
      lastname: registerLastname,
      identifiant: registerEmail,
      password: registerPassword,
    };
    try {
      const newUserRegitered = await registerService.newUser(newUser);
      console.log(newUserRegitered);
      if (newUserRegitered.status == 500) {
        newUserRegitered.data.error.details.forEach((error) => {
          console.log(error.message);
          setRegisterError([...registerError, error.message]);
          console.log(registerError);
        });
        console.log("length", registerError.length);
        if (newUserRegitered.data.error.details.length > 0) {
          console.log("condition error");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false), setRegisterError([]);
          }, 5000);
        }
      } else if (newUserRegitered.status == 201) {
        setValidationMessage(newUserRegitered.data.message);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setValidationMessage("");
          navigate("/login");
        }, 5000);
      } else if (newUserRegitered.status == 409) {
        setEmailExist(newUserRegitered.data.message);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setEmailExist("");
        }, 5000);
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  return (
    <section>
      <div className="register">
        <div>
          <h1>Ta liste de tâches</h1>
        </div>
        <div className="register_h2_form">
          <h2>Création de compte</h2>
          {registerError.map((message) => {
            console.log("map", message, showMessage);
            return (
              <p className={showMessage ? "displayErrorMessage" : "none"}>
                {message}
              </p>
            );
          })}
          <p className={showMessage ? "displayValidatedMessage" : "none"}>
            {validationMessage}
          </p>
          <p className={showMessage ? "displayErrorMessage" : "none"}>
            {emailExist}
          </p>
          <form className="register_form" onSubmit={handleSubmitRegister}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="ton nom"
              value={registerFirstname}
              onChange={(evt) => {
                handleChangeRegisterFields(evt.target.value, "firstname");
              }}
            />
            <label htmlFor="lastname">Prénom</label>
            <input
              type="text"
              id="lastname"
              placeholder="ton prénom"
              value={registerLastname}
              onChange={(evt) => {
                handleChangeRegisterFields(evt.target.value, "lastname");
              }}
            />
            <label htmlFor="email">Identifiant (email)</label>
            <input
              type="email"
              id="email"
              placeholder="exemple@gmail.com"
              value={registerEmail}
              onChange={(evt) => {
                handleChangeRegisterFields(evt.target.value, "email");
              }}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={registerPassword}
              onChange={(evt) => {
                handleChangeRegisterFields(evt.target.value, "password");
              }}
            />
            <button type="submit">Créer mon compte</button>
            <Link to="/login">
              <p>Se connecter</p>
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

export default RegisterPage;
