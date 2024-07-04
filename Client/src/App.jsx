import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './Components/Router'
import {createContext} from 'react'
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export const userContext = createContext()

 function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("User")))

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router />
    </userContext.Provider>

  );
}


export default App;
