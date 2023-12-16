import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    credentials: 'include'
});

class TasksService {
    async findAll(userID){
        const axiosResponse = await axiosInstance.get('task/tasks/'+userID)
        .then((response)=>{
            console.log(response);
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
            console.log(response);
            return response
        })
        .catch(function (error){
            console.log(error);
        });
        return axiosResponse
    }
    async delete(id){
        const axiosResponse = await axiosInstance.delete('task/'+id)
        .then((response)=>{
            console.log(response);
            return response
        })
        .catch((error)=>{
            console.log(error);
        })
        return axiosResponse;
    }

}

export default TasksService;