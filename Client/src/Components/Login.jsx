import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  // const { currentUser, setCurrentUser } = useContext(userContext);
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
  
      console.log('Response status:', response.status);
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
    // localStorage.setItem("currentUser", JSON.stringify(userDetails));
    navigate("/home");
    // setCurrentUser(userDetails);
  }

  return (
    <>
      <div>
        <h1>Please Log In</h1>
        <form onSubmit={handleFormSubmit}>
          <input name="email" type="text" placeholder="email" required />
          <input name="password" type="password" placeholder="password" required />
          <button type="submit">Submit</button>
        </form>
        <p>{errorMessage}</p>
        <p>
          <Link to={"/register"}>sign up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
