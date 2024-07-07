import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { userContext } from "../../App.jsx";
import style from './Login.module.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, setCurrentUser } = useContext(userContext);

  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token, { expires: 3 });
        const userDetails = await getCurrentUser(email);
        navigateToHomePage(userDetails);
      } else {
        setErrorMessage("Incorrect email or password");
      }
    } catch (error) {
      setErrorMessage("ERROR. Please try again");
    }
  }

  async function getCurrentUser(email) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`http://localhost:3000/users?email=${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        return result[0];
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setErrorMessage("Failed to fetch user details");
    }
  }
  

  function navigateToHomePage(userDetails) {
    navigate("/home");
    localStorage.setItem("currentUser", JSON.stringify(userDetails.type));
    setCurrentUser(userDetails);
  }

  return (
    <div className={style.container}>
      <img src="../Images/logo.png" alt="Logo" className={style.logo} />
      <h1 className={style.header}>Please Log In</h1>
      <form onSubmit={handleFormSubmit} className={style.form}>
        <input name="email" type="text" placeholder="Email" required className={style.input} />
        <input name="password" type="password" placeholder="Password" required className={style.input} />
        <button type="submit" className={style.button}>Submit</button>
      </form>
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      <p>
        <Link to="/register" className={style.link}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
