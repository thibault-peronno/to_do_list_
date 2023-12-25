import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    credentials: 'include'
});

class ProfilService {
    async udpateUser(userDatas, id){
        const axiosResponse = await axiosInstance.put('user/'+id, userDatas)
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

export default ProfilService;