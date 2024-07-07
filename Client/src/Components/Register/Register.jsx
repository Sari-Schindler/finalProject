import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import style from "./Register.module.css";
import { userContext } from "../../App";

const Register = () => {
  const [PW, setPW] = useState({ password: "", verifyPW: "" });
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [registerStep, setRegisterStep] = useState(1);
  const [available, setAvailable] = useState({ username: true, email: true });
  const navigate = useNavigate()
  const { setCurrentUser } = useContext(userContext);

  const [user, setUser] = useState({
    type: "User",
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    setIsPwVerified(PW.password !== "" && PW.password === PW.verifyPW);
  }, [PW.password, PW.verifyPW]);

  const handleNextBtn = async (event) => {
    event.preventDefault();
    setErrMessage("");

    try {
      const response = await fetch(
        `http://localhost:3000/register/exist?username=${event.target.username.value}&email=${event.target.email.value}`
      );
      const json = await response.json();
      setAvailable({ username: !json.username, email: !json.email });

      if (!json.username && !json.email) {
        requestMoreDetails(event);
      }
    } catch (error) {
      setErrMessage("ERROR, try again.");
    }
  };

  const requestMoreDetails = (event) => {
    setUser({
      type: user.type,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    });
    setRegisterStep(2);
  };

  const addUser = async (updatedUser) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      if (response.status === 201) {
        const resBody = await response.json();
        Cookies.set("token", resBody.token, { expires: 3 });
        navigate("/home");
        localStorage.setItem("currentUser", JSON.stringify(user.type));
        setCurrentUser(user);
      } else {
        setErrMessage("500 something went wrong :( try later.");
      }
    } catch (error) {
      setErrMessage("500 something went wrong :( try later.");
    }
  };

  useEffect(() => {
    if (registerStep === 2) {
      addUser(user);
    }
  }, [registerStep, user]);

  return (
    <div className={style.container}>
      <img src="../Images/logo.png" alt="Logo" className={style.logo} />
      <h1 className={style.header}>Please sign up</h1>
      {registerStep === 1 && (
        <form onSubmit={handleNextBtn} className={style.form}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className={style.input}
          />
          {!available.username && <p>Username already exists</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className={style.input}
          />
          {!available.email && <p>Email already exists</p>}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPW((prev) => ({ ...prev, password: e.target.value }))
            }
            required
            className={style.input}
          />
          <input
            name="verifyPassword"
            type="password"
            placeholder="Verify password"
            onChange={(e) =>
              setPW((prev) => ({ ...prev, verifyPW: e.target.value }))
            }
            required
            className={style.input}
          />
          <button
            type="submit"
            disabled={!isPwVerified}
            className={style.button}
          >
            Confirm
          </button>
        </form>
      )}
      {registerStep === 2 && <p>Registering...</p>}
      {errMessage && <p className={style.errorMessage}>{errMessage}</p>}
      <p>
        <Link to="/login" className={style.link}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
