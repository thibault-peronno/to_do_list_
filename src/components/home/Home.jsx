/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from 'axios';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import TasksService from "../../services/tasks.service.js";
import { Link } from "react-router-dom";
import "./home.scss";

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:3000/api/",
//     withCredentials: true,
//     credentials: 'include'
// });

function Home() {
  const tasksService = new TasksService();
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [updateTask, setUpdateTask] = useState([]);
  const [updateIsActif, setUpdateIsActif] = useState(false);
  const [errorValidation, setErrorValidation] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  //   const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await tasksService.findAll(user.id);
        console.log(tasksData);
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
      console.log('new task', newTask);
      if(newTask.status === 201){
        setTasks((tasks) => [...tasks, newTask.data[0]]);
        setTask("");
      }
      console.log(newTask.status);
      if (newTask.status === 500) {
        console.log(newTask.data.message.details);
        newTask.data.message.details.forEach((error) => {
          console.log(error.message);
          setErrorValidation([...errorValidation, error.message]);
          console.log(errorValidation);
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
  const updatedTask = async (evt, updateValue)=> {
    evt.preventDefault();
    console.log(updateTask);
    const updatedTask = {
      description: updateValue.description,
      isDone: updateValue.isDone,
      id: updateValue.id,
    }
    console.log(updatedTask);
    try {
      const taskUpdated = await tasksService.update(updatedTask);
      if (taskUpdated.status === 500) {
        console.log(taskUpdated.data.message.details);
        console.log(taskUpdated.data.error);
        setErrorValidation(taskUpdated.data.error);
        console.log(errorValidation);
        if(taskUpdated.data.message.details){
          taskUpdated.data.message.details.forEach((error) => {
            console.log(error.message);
            setErrorValidation([...errorValidation, error.message]);
            console.log(errorValidation);
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
  }
  const handleDelete = async (evt, task_id) => {
    evt.preventDefault();
    console.log(evt, task_id);
    try {
      const deleteTask = await tasksService.delete(task_id);
      console.log(deleteTask);
      const newListTasks = await tasksService.findAll(user.id);
      setTasks(newListTasks.data);
    } catch (error) {
      console.log(error);
    }
    // axiosInstance.delete('task/'+task_id)
  };
  const handleToggleDone = async (evt, task) => {
    evt.preventDefault();
    console.log(evt, task);
    try {
      const isDone = await tasksService.updateisDone(task);
      console.log(isDone);
      const newListTasks = await tasksService.findAll(user.id);
      setTasks(newListTasks.data);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleIsActif = (task) => {
    console.log(task);
    setUpdateIsActif(true);
    setUpdateTask(task);
  };
  const toggleNotActif = () => {
    setUpdateIsActif(false);
  };
  const UpdateFieldTask = (updatedTask) =>{
    setUpdateTask(updateTask => ({...updateTask, ...updateTask.description = updatedTask}))
    console.log(updateTask);
  }
  return (
    <section className="home-section ">
      <div className={updateIsActif ? "update_isActif" : "update"}>
        <input
          className="update_text"
          type="text"
          value={updateTask.description}
          onChange={(evt) => UpdateFieldTask(evt.target.value)}
        />
        <div className="update_btns">
          <button className="cancel-button" onClick={toggleNotActif}>
            X
          </button>
          <button className="valid-button" onClick={(e) =>updatedTask(e, updateTask)}>V</button>
        </div>
      </div>
      <div className="home">
        <span className="home_name">
          <div>
            <Link to="/profil">
            <p>thibault</p>
            </Link>
            <img src="" alt="" />
          </div>
        </span>
        <p className="home_p">Une nouvelle tâche ?</p>
        {errorValidation.map((message) => {
            console.log("map", message, showMessage);
            return (
              <p className={showMessage ? "displayErrorMessage" : "none"}>
                {message}
              </p>
            );
          })
        }
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
                <div>
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
