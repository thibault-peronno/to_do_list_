import { useState, createContext } from "react";
import Login from "./components/Login/Login";
import './app.scss';

const AuthContext = createContext(null);

function App(){
   const [isLog, setIsLog] = useState(null);

 return (
   <AuthContext.Provider value={{ isLog, setIsLog }}>
    <div className="stroke">
     <Login />
    </div>
   </AuthContext.Provider>
 );

}

export default App;

