import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function About() {

    const navigate = useNavigate();

    function backToHome(){
        navigate("/home");
    }

    return(<>
    <h1>Build your startegy with us!!!</h1>
    <h2>Why to choose us?</h2>
    <p>blablabla</p>
    <button onClick={backToHome}>scroll up👆</button>

    </>)
}
