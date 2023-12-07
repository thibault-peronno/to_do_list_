import { useState } from "react";
import "./register.scss";

function RegisterPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerLastname, setRegisterLastname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  return (
    <section>
      <div className="register">
        <div>
          <h1>Ta liste de tâches</h1>
        </div>
        <div className="register_h2_form">
          <h2>Création de compte</h2>
          <form className="register_form">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="ton nom"
              value={registerName}
              onChange={(evt) => {
                console.log("register name");
              }}
            />
            <label htmlFor="lastname">Prénom</label>
            <input
              type="text"
              id="lastname"
              placeholder="ton prénom"
              value={registerLastname}
              onChange={(evt) => {
                console.log("register lastname");
              }}
            />
            <label htmlFor="email">Prénom</label>
            <input
              type="email"
              id="email"
              placeholder="exemple@gmail.com"
              value={registerEmail}
              onChange={(evt) => {
                console.log("register email");
              }}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={registerEmail}
              onChange={(evt) => {
                console.log("register email");
              }}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={registerEmail}
              onChange={(evt) => {
                console.log("register email");
              }}
            />
            <button type="submit">Créer mon compte</button>
            <p>Se créer un compte</p>
          </form>
        </div>
        <div className="login_footer">
          <p className="login_footer-text owner">Thibault PERONNO</p>
          <p className="login_footer-text">
            Pour le titre Concepteur et Développeur d'Application
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
