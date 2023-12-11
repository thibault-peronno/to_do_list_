import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import './home.scss';
import { UserContext } from "../../App.jsx";


const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    credentials: 'include'
});

function Home(){
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    useEffect(()=>{
        axiosInstance.get('task/tasks/'+user.userID)
        .then((response)=>{
            console.log(response);
            setTasks(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    const handleChangeFieldTask = (task) =>{
        setTask(task);
    }
    const handleNewTask = (evt) => {
        evt.preventDefault();
        console.log();
        axiosInstance.post('task/', {
            "description" : task,
            "isDone" : false,
            "user_id" : user.userID
        })
        .then(function (response){
            console.log(response);
            setTasks(tasks =>[response.data, ...tasks])
        })
        .catch(function (error){
            console.log(error);
        })
    }
    const handleDelete= (evt, task_id) =>{
        evt.preventDefault();
        console.log(task_id);
        axiosInstance.delete('task/'+task_id)
    }
    return(
        <section className='home-section'>
            <div className="home">
                <span className="home_name">
                    <div>
                        <p>thibault</p>
                        <img src="" alt="" />
                    </div>
                </span>
                <p className="home_p">Une nouvelle tâche ?</p>
                <form onSubmit={handleNewTask} className='home_form'>
                    <input type="text" id="newTask" value={task}  onChange={(evt) =>
                handleChangeFieldTask(evt.target.value)} placeholder="Votre tâche"/>
                    <button type="submit">Ajouter</button>
                </form>
                <h1>Mes tâches</h1>
                <ul>
                    {tasks.map((task)=>{
                        return <li class="home_tasks_li" key={task.id}>
                            <p>{task.description}</p>
                            <div>
                                <img class="home_tasks_icon" src="../../../public/assets/svg/edit.svg" alt="editer la tâche" />
                                <button onclick={handleDelete(task.id)}>
                                    <img class="home_tasks_icon" src="../../../public/assets/svg/delete.svg" alt="supprimer la tâche" />
                                </button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            <footer className="footer">A propos</footer>
        </section>
    )

}

export default Home;