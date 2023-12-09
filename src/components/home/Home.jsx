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
    const [tasks, setTasks] = useState([])
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

    const handleNewTask = (evt) => {
        evt.preventDefault();
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
                    <input type="text" id="newTask" placeholder="Votre tâche"/>
                    <button type="submit">Ajouter</button>
                </form>
                <h1>Mes tâches</h1>
                <ul>
                    {tasks.map((task)=>{
                        return <li key={task.id}>
                            <p>{task.description}</p>
                        </li>
                    })}
                </ul>
            </div>
            <footer className="footer">A propos</footer>
        </section>
    )

}

export default Home;