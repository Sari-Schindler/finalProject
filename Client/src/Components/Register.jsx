import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
    const [PW, setPW] = useState({ password: "", verifyPW: "" });
    const [isPwVerified, setIsPwVerified] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [registerStep, setRegisterStep] = useState(1);
    const [available, setAvailable] = useState({ username: true, email: true });
    const navigate = useNavigate();
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
            const response = await fetch(`http://localhost:3000/register/exist?username=${event.target.username.value}&email=${event.target.email.value}`);
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
            type: "User",
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
        });
        setRegisterStep(2);
    };

    const addUser = async (updatedUser) => {
        try {
            console.log(updatedUser);
            debugger;
            const response = await fetch("http://localhost:3000/register", {
                method: 'POST',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.status === 201) {
                const resBody = await response.json();
                Cookies.set('token', resBody.token, { expires: 3 });
                navigate("/home");
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
        <div>
            <h1>Please sign up</h1>
            {registerStep === 1 && (
                <form onSubmit={handleNextBtn}>
                    <input name="username" type="text" placeholder="username" required />
                    {!available.username && <p>Username already exists</p>}
                    <input name="email" type="email" placeholder="email" required />
                    {!available.email && <p>Email already exists</p>}
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPW((prev) => ({ ...prev, password: e.target.value }))}
                        required
                    />
                    <input
                        name="verifyPassword"
                        type="password"
                        placeholder="verify password"
                        onChange={(e) => setPW((prev) => ({ ...prev, verifyPW: e.target.value }))}
                        required
                    />
                    <button type="submit" disabled={!isPwVerified}>confirm[</button>
                </form>
            )}
            <p>{errMessage}</p>
        </div>
    );
};

export default Register;
