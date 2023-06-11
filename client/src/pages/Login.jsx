import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3001/api/login", {
      method: 'POST',
      headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if(data.token){
      alert('User Logged In');
      window.localStorage.setItem('token', data.token);
      navigate("/");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='email' name='email' value={userData.email} onChange={handleChange}/>
        <br />
        <input type="password" placeholder='password' name='password' value={userData.password} onChange={handleChange}/>
        <br />
        <button type='submit'>Login</button>
        <br />
        <small>Don't have an account then <Link to='/register'>Register</Link></small>
      </form>
    </section>
  )
}

export default Login;