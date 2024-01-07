import "./profil.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../App.jsx";
import { Link } from "react-router-dom";
import ProfilService from "../../services/profil.service.js";

function Profil() {
  const profilServie = new ProfilService();
  const { user, setUser } = useContext(UserContext);
  const [updateIsActif, setUpdateIsActif] = useState(false);
  const [registerName, setRegisterName] = useState(user.firstname);
  const [registerLastname, setRegisterLastname] = useState(user.lastname);
  const [registerEmail, setRegisterEmail] = useState(user.email);
  const [ showMessage, setShowMessage] = useState(false);
  const [ validatedMessage, setValidatedMessage ] =useState("");
  const [ errordMessage, setErrordMessage ] =useState([]);

  const updateProfil = () => {
    setUpdateIsActif(true);
  };
  const returnProfil = () => {
    setUpdateIsActif(false);
  };

  const handleChangeFieldLogin = (value, field) => {
    if (field == "email") {
      setRegisterEmail(value);
    } else if (field == "lastname") {
      setRegisterLastname(value);
    } else if (field == "name") {
      setRegisterName(value);
    }
  };

  const handleSubmitUpdateProfil = async (evt) => {
    evt.preventDefault();
    const updateDatas = {
      firstname: registerName,
      lastname: registerLastname,
      identifiant: registerEmail,
      id: user.id
    };
    const updatedProfil = await profilServie.udpateUser(updateDatas, user.id);
    if(updatedProfil.status === 400){
      updatedProfil.data.details.forEach((error)=>{
        setErrordMessage((errordMessage)=>[...errordMessage, error.message]);
        setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false), setErrordMessage([]);
          }, 5000);
      })
    }else if(updatedProfil.status == 200){
      setUser(updatedProfil.data.data[0]);
      setValidatedMessage(updatedProfil.data.message, updatedProfil.data.status);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false), setErrordMessage([]);
      }, 5000);
    }
    returnProfil()
  };

  return (
    <section className="profil">
      <span className={!updateIsActif ? "profil" : "none"}>
        <div className="profil_container">
          <span className="profil_container-btns">
            <button className="edit-button" onClick={() => updateProfil()}>
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
                <p className={showMessage ? "displayValidatedMessage" : "none"}>{ validatedMessage }</p>
                {errordMessage.map((message) => {
            return (
              <p className={showMessage ? "displayErrorMessage" : "none"}>
                {message}
              </p>
            );
          })}
              <div className="container-names">
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
              </div>
              {/* It is a temporary fixed. I should check my API to change a little part of code */}
              <p className="container-mail">{user.email || user.identifiant}</p>
            </span>
            <Link to="/" className="profil_link">
              <button className="profil_button">Retour à mes tâches</button>
            </Link>
          </div>
          <p className="about">A propos</p>
        </div>
      </span>
      <span className={updateIsActif ? "form_isActif" : "none"}>
        <div className="form_container">
          <div className="form_container-btns">
            <button className="cancel-button" onClick={() => returnProfil()}>
              <p>X</p>
            </button>
          </div>
          <form
            className="form_container-infos"
            onSubmit={handleSubmitUpdateProfil}
          >
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="ton nom"
              value={registerName}
              onChange={(evt) => {
                handleChangeFieldLogin(evt.target.value, "name");
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
            <button type="submit">Modifier</button>
          </form>
          <p className="about">A propos</p>
        </div>
      </span>
    </section>
  );
}

export default Profil;
