import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink} from "react-router-dom";


export default function Home() {


    const [haveQuestion, setHaveQuestion]=useState(false);


    function handleQuestion(){
        setHaveQuestion(true);
    }

    function leaveMessage(){
        setHaveQuestion(false);
    }

    return(<>

    <NavLink to="debts">learn about debts</NavLink><br />
    <NavLink to="risks">risks</NavLink><br />
    <NavLink to="about">about</NavLink><br />
    <h1>home</h1>

    <button onClick={handleQuestion}>leave details</button>


    {haveQuestion && <form onSubmit={leaveMessage}>
        <p>leave your details and we will be back soon</p>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required noValidate />
        </div><br />
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" required noValidate />
        </div><br />
        <button type="submit">send</button>
        </form>}

    
    </>)
}
