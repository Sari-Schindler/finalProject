import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
//import bcrypt from 'bcrypt'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  //const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    fetch(`http://localhost:3000/login`,{
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
    })
      .then(async (response) =>{
      console.log('response: ', response)    
          if(response.ok){
            const data = await response.json();
            // console.log('data: ', data)
            // Cookies.set('token', data.token, { expires: 3});
            const userDetails = await getCurrentUser(email);
            console.log('curr: ', userDetails)
            navigateToHomePage(userDetails);
          } 
        else{setErrorMessage("Incorrect email or password")}
    })
      .then(console.log("something"))  
      .catch((error) => setErrorMessage("ERROR. Please try again"));
  }

  async function getCurrentUser(email){

    const response = await fetch(`http://localhost:3000/users?email=${email}`,{
            method: 'GET',
            headers: {
                'Authorization': Cookies.get('token')
            },
    }).then((result) => result.json())
    .then((res) => res[0])
   return response;
  }

  function navigateToHomePage(userDetails) {
    //localStorage.setItem("currentUser", JSON.stringify(userDetails));
    navigate("/home");
    //setCurrentUser(userDetails);
  }

  return (
    <>
      <div>
        <h1>Please Log In</h1>
        <form onSubmit={handleFormSubmit} >
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
