/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext, UserContext } from "../../App.jsx";
import TasksService from "../../services/tasks.service.js";
import { Link, useNavigate } from "react-router-dom";
import "./home.scss";

const axiosInstance = axios.create({
  baseURL: "https://api-to-do-list.thibault-peronno.fr/api/api",
  withCredentials: true,
  credentials: "include",
});

function Home() {
  const tasksService = new TasksService();
  const { user } = useContext(UserContext);
  const { isLog, setIsLog } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [updateTask, setUpdateTask] = useState([]);
  const [updateIsActif, setUpdateIsActif] = useState(false);
  const [errorValidation, setErrorValidation] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  //   const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await tasksService.findAll(user.id);
        setTasks(tasksData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);
  const handleChangeFieldTask = (task) => {
    setTask(task);
  };
  const handleNewTask = async (evt) => {
    evt.preventDefault();
    const newvalue = {
      description: task,
      isDone: false,
      user_id: user.id,
    };
    try {
      const newTask = await tasksService.new(newvalue);
      if (newTask.status === 201) {
        setTasks((tasks) => [...tasks, newTask.data[0]]);
        setTask("");
      } else if (newTask.response.status === 400) {
        newTask.response.data.details.forEach((error) => {
          setErrorValidation(errorValidation=>[...errorValidation, error.message]);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false), setErrorValidation([]);
          }, 5000);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatedTask = async (evt, updateValue) => {
    evt.preventDefault();
    const updatedTask = {
      description: updateValue.description,
      isDone: updateValue.isDone,
      id: updateValue.id,
    };
    try {
      const taskUpdated = await tasksService.update(updatedTask);
      if (taskUpdated.status === 500) {
        setErrorValidation(taskUpdated.data.error);
        if (taskUpdated.data.message.details) {
          taskUpdated.data.message.details.forEach((error) => {
            setErrorValidation([...errorValidation, error.message]);
          });
        }
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false), setErrorValidation([]);
        }, 5000);
      }
      const newListTasks = await tasksService.findAll(user.id);
      setTasks(newListTasks.data);
      toggleNotActif();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (evt, task_id) => {
    evt.preventDefault();
    try {
      const deleteTask = await tasksService.delete(task_id);
      const newListTasks = await tasksService.findAll(user.id);
      setTasks(newListTasks.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleDone = async (evt, task) => {
    evt.preventDefault();
    try {
      const isDone = await tasksService.updateisDone(task);
      const newListTasks = await tasksService.findAll(user.id);
      setTasks(newListTasks.data);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleIsActif = (task) => {
    setUpdateIsActif(true);
    setUpdateTask(task);
  };
  const toggleNotActif = () => {
    setUpdateIsActif(false);
  };
  const UpdateFieldTask = (updatedTask) => {
    setUpdateTask((updateTask) => ({
      ...updateTask,
      ...(updateTask.description = updatedTask),
    }));
  };
  const logout = (evt) => {
    evt.preventDefault();
    axiosInstance.get("auth/logout").then((response) => {
      setIsLog(false);
      navigate("/login");
    });
  };
  return (
    <section className="home-section ">
      <div className={updateIsActif ? "update_isActif" : "update"}>
      <textarea
      className="update_text"
        name="postContent"
        value={updateTask.description}
        rows={4}
        cols={40}
        onChange={(evt) => UpdateFieldTask(evt.target.value)}
      />
        {/* <input
          className="update_text"
          type="text"
          value={updateTask.description}
          onChange={(evt) => UpdateFieldTask(evt.target.value)}
        /> */}
        <div className="update_btns">
          <button className="cancel-button" onClick={toggleNotActif}>
            X
          </button>
          <button
            className="valid-button"
            onClick={(e) => updatedTask(e, updateTask)}
          >
            V
          </button>
        </div>
      </div>
      <div className="home">
        <span className="home_name">
          <Link to="/profil">
            <p>{user.lastname}</p>
          </Link>
          <button className="edit-button" onClick={(e) => logout(e)}>
            <img
              className="home_tasks_icon icon"
              src="../../../public/assets/svg/logout.svg"
              alt="se déconnecter"
            />
          </button>
          <img src="" alt="" />
        </span>
        <p className="home_p">Une nouvelle tâche ?</p>
        {errorValidation.map((message) => {
          return (
            <p className={showMessage ? "displayErrorMessage" : "none"}>
              {message}
            </p>
          );
        })}
        <form onSubmit={handleNewTask} className="home_form">
          <input
            type="text"
            id="newTask"
            value={task}
            onChange={(evt) => handleChangeFieldTask(evt.target.value)}
            placeholder="Votre tâche"
          />
          <button type="submit">Ajouter</button>
        </form>
        <h1>Mes tâches</h1>
        <div className="home_taks-div">
          {tasks.map((task) => {
            return (
              <div className="home_tasks_task" key={task.id}>
                <span className="home_tasks-task_input">
                  <input
                    type="checkbox"
                    checked={
                      task.isDone === 1 || task.isDone === true ? true : false
                    }
                    id={task.id}
                    onClick={(e) => handleToggleDone(e, task)}
                  />
                  <p>{task.description}</p>
                </span>
                <div className="home_tasks-btn">
                  <button
                    className="edit-button"
                    onClick={() => toggleIsActif(task)}
                  >
                    <img
                      className="home_tasks_icon icon"
                      src="../../../public/assets/svg/edit.svg"
                      alt="editer la tâche"
                    />
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => handleDelete(e, task.id)}
                  >
                    <img
                      className="home_tasks_icon icon"
                      src="../../../public/assets/svg/delete.svg"
                      alt="supprimer la tâche"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <footer className="footer">A propos</footer>
    </section>
  );
}

export default Home;
