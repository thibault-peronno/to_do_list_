import { useState, createContext } from "react";
import './app.scss';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Profil from "./components/profil/Profil";
export const AuthContext = createContext(false);
export const UserContext = createContext(null)

function App(){
   const [isLog, setIsLog] = useState(false);
   const [user, setUser] = useState(null)
   const location = useLocation();

 return (
   <AuthContext.Provider value={{isLog, setIsLog} }>
    <UserContext.Provider value= {{user, setUser}}>
    <div className="stroke">
      {!isLog && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />          
        </Routes>
      )}
      {isLog && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      )}
      {(!isLog && location.pathname !== '/login' && location.pathname !== '/register') && (
        <Navigate replace to={"/login"} />
      )}
    </div>
    </UserContext.Provider>
   </AuthContext.Provider>
 );

}

export default App;

