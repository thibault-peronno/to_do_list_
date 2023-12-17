// import axios from 'axios';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import TasksService from "../../services/tasks.service.js";
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
  const [task, setTask] = useState([]);
//   const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await tasksService.findAll(user.userID);
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
      user_id: user.userID,
    };
    try {
      const newTask = await tasksService.new(newvalue);
      setTasks((tasks) => [...tasks, newTask.data[0]]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (evt, task_id) => {
    evt.preventDefault();
    console.log(evt, task_id);
    try {
      const deleteTask = await tasksService.delete(task_id);
      console.log(deleteTask);
      const newListTasks = await tasksService.findAll(user.userID);
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
        const isDone = await tasksService.updateIsdone(task);
        console.log(isDone);
        const newListTasks = await tasksService.findAll(user.userID);
      setTasks(newListTasks.data);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <section className="home-section">
      <div className="home">
        <span className="home_name">
          <div>
            <p>thibault</p>
            <img src="" alt="" />
          </div>
        </span>
        <p className="home_p">Une nouvelle tâche ?</p>
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
                  <input type="checkbox" checked={task.isdone === 1 ? true : false } id={task.id} onClick={(e) => handleToggleDone(e, task)}/>
                  <p>{task.description}</p>
                </span>
                <div>
                  <img
                    className="home_tasks_icon"
                    src="../../../public/assets/svg/edit.svg"
                    alt="editer la tâche"
                  />
                  <button
                    className="delete-button"
                    onClick={(e) => handleDelete(e, task.id)}
                  >
                    <img
                      className="home_tasks_icon"
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