import React from "react";
import { Route, Routes} from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"

function App() {
  const token = localStorage.getItem('token');
  return (
    <>
     <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      {token && <Route path="/" element={<Home />}/>}
     </Routes> 
    </>
  );
}

export default App;
