import "./profil.scss";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import { Link } from "react-router-dom";

function Profil() {
  const { user } = useContext(UserContext);

  return (
    <section className="profil">
        <div className="profil_container">
        <span>
            <button className="edit-button" 
            // onClick={() => toggleIsActif(task)}
            >
            <img
                className="profil_tasks_icon"
                src="../../../public/assets/svg/edit.svg"
                alt="editer l'utilisateur'"
            />
            </button>
            <button
            className="delete-button"
            //   onClick={(e) => handleDelete(e, task.id)}
            >
            <img
                className="profil_tasks_icon"
                src="../../../public/assets/svg/delete.svg"
                alt="supprimer l'utilisateur'"
            />
            </button>
        </span>
        <div>
        <p>{user.name}</p>
        <p>{user.lastname}</p>
        </div>
        <p>{user.email}</p>
        <Link to="/">
        <button className="profil_button">
            Retour à mes tâches
        </button>

        </Link>

        </div>
    </section>
  );
}

export default Profil;
