import { useState, createContext } from "react";
import './app.scss';
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
export const AuthContext = createContext(false);
export const UserContext = createContext(null)

function App(){
   const [isLog, setIsLog] = useState(false);
   const [user, setUser] = useState(null)

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
        </Routes>
      )}
    </div>
    </UserContext.Provider>
   </AuthContext.Provider>
 );

}

export default App;

