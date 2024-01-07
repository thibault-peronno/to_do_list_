import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    credentials: 'include'
});

class TasksService {
    async findAll(id){
        const axiosResponse = await axiosInstance.get('task/tasks/'+id)
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log(error);
        })
        return axiosResponse;
    }
    async new(newvalue){
        const axiosResponse= axiosInstance.post('task/', newvalue)
        .then(function (response){
            return response
        })
        .catch(function (error){
            console.log(error);
            return error
        });
        return axiosResponse
    }
    async delete(id){
        const axiosResponse = await axiosInstance.delete('task/'+id)
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log(error);
        })
        return axiosResponse;
    }
    async update(updateValue){
        const axiosResponse = await axiosInstance.put('task/'+updateValue.task_id, updateValue)
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log(error);
            return error.response;
        })
        return axiosResponse;
    }
    async updateisDone(task){
        task.isDone = !task.isDone;
        const axiosResponse = await axiosInstance.put('task/'+task.id, task)
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log(error);
        })
        return axiosResponse;
    }

}

export default TasksService;