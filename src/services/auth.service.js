import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
  credentials: "include",
});

class AuthService {
  async login(email, password) {
    const axiosResponse = axiosInstance
      .post("auth/login", {
        identifiant: email,
        password: password,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
    return axiosResponse;
  }
}

export default AuthService;
