import React from "react";
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"

function App() {
  const token = localStorage.getItem('token');
  return (
    <>
     <Routes>
      <Route path="/register" element={token ? <Navigate to="/" /> : <Register />}/>
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />}/>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" /> } />
     </Routes> 
    </>
  );
}

export default App;
