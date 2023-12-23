import "./profil.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../App.jsx";
import { Link } from "react-router-dom";

function Profil() {
  const { user } = useContext(UserContext);
  const [updateIsActif, setUpdateIsActif] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerLastname, setRegisterLastname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const updateProfil = () => {
    console.log(updateIsActif);
    setUpdateIsActif(true)
  }
  const returnProfil = () => {
    setUpdateIsActif(false)
  }

  const handleChangeFieldLogin = (value, field) => {
    if (field == "email") {
        setRegisterEmail(value);
    } else if (field == "lastname") {
        setRegisterLastname(value);
    }
    else if (field == "name"){
        setRegisterName(value);
    }
  };

  const handleSubmitProfil = (evt) => {
    console.log(evt, 'submit profil');
  }

  return (
    <section className="profil">
        <span className={!updateIsActif ? "profil"  : "none"}>
      <div className="profil_container">
        <span className="profil_container-btns">
          <button
            className="edit-button"
            onClick={() => updateProfil()}
          >
            <img
              className="profil_tasks_icon icon"
              src="../../../public/assets/svg/edit.svg"
              alt="editer l'utilisateur'"
            />
          </button>
          <button
            className="delete-button"
            //   onClick={(e) => handleDelete(e, task.id)}
          >
            <img
              className="profil_tasks_icon icon"
              src="../../../public/assets/svg/delete.svg"
              alt="supprimer l'utilisateur'"
            />
          </button>
        </span>
        <div className="profil_container-infos">
          <span className="container-infos_names_mail">
            <div className="container-names">
              <p>{user.name}</p>
              <p>{user.lastname}</p>
            </div>
            <p className="container-mail">{user.email}</p>
          </span>
          <Link to="/" className="profil_link">
            <button className="profil_button">Retour à mes tâches</button>
          </Link>
        </div>
        <p className="profil_about">A propos</p>
      </div>
        </span>
        <span className={updateIsActif ? "form_isActif" : "none"}>
      <div className="form_container">
        <div className="form_container-btns">
          <button
            className="cancel-button"
            onClick={() => returnProfil()}
          >
            <p>X</p>
          </button>
        </div>
        <div className="form_container-infos">
          <form onSubmit={handleSubmitProfil}>
          <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="ton nom"
              value={registerName}
              onChange={(evt) => {
                handleChangeFieldLogin(evt.target.value, "nom");
              }}
            />
            <label htmlFor="lastname">Prénom</label>
            <input
              type="text"
              id="lastname"
              placeholder="ton prénom"
              value={registerLastname}
              onChange={(evt) => {
                handleChangeFieldLogin(evt.target.value, "lastname");
              }}
            />
            <label htmlFor="email">Identifiant</label>
            <input
              type="email"
              id="email"
              placeholder="exemple@gmail.com"
              value={registerEmail}
              onChange={(evt) => {
                handleChangeFieldLogin(evt.target.value, "email");
              }}
            />
          </form>
        </div>
        <p className="form_about">A propos</p>
      </div>

        </span>
    </section>
  );
}

export default Profil;
