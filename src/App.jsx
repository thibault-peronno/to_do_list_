import { useState, createContext } from "react";
import './app.scss';
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
const AuthContext = createContext(null);

function App(){
   const [isLog, setIsLog] = useState(false);

 return (
   <AuthContext.Provider value={{ isLog, setIsLog }}>
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
   </AuthContext.Provider>
 );

}

export default App;

