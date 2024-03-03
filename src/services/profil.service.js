import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api-to-do-list.thibault-peronno.fr",
    withCredentials: true,
    credentials: 'include'
});

class ProfilService {
    async udpateUser(userDatas, id){
        const axiosResponse = await axiosInstance.put('user/'+id, userDatas)
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log(error);
            return error.response;
        })
        return axiosResponse;
    }
}

export default ProfilService;