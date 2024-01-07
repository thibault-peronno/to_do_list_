import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    credentials: 'include'
});

class RegisterService {
    async newUser(userDatas){
        const axiosResponse = await axiosInstance.post("auth/register", userDatas)
        .then((response)=>{
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return error.response
        })
        return axiosResponse;
    }
}

export default RegisterService