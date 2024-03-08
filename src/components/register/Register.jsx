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
      if (newUserRegitered.status == 400) {
        if(newUserRegitered.data.details != []){
          newUserRegitered.data.details.forEach((error) => {
            /**
             * In React, when you're updating state based on the previous state, you should use a function inside your setState call. This function will receive the previous state as its argument and should return the new state.
              Here's a breakdown of the line setRegisterError(prevState => [...prevState, error.message]);:
  
              setRegisterError: This is the function you're using to update your state. It's likely defined in your component like so: const [registerError, setRegisterError] = useState([]);
              (prevState => ...): This is a function that takes the previous state as its argument. The prevState here represents the current state at the time this update is being applied.
              [...prevState, error.message]: This is creating a new array that includes all elements from prevState (the spread operator ... is used to copy all elements from prevState), followed by error.message. This effectively adds the new error message to the end of the existing array of error messages.
              So, in summary, this line is saying "take the current state, add this new error message to the end of it, and then update the state with this new array".
             */
            setRegisterError((registerError) => [
              ...registerError,
              error.message,
            ]);
          });
          if (newUserRegitered.data.details.length > 0) {
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false), setRegisterError([]);
            }, 5000);
          }

        }else {
          setRegisterError((registerError) => [...registerError, 'Erreur serveur']);
          setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setRegisterError([]);
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

export default RegisterPage;
