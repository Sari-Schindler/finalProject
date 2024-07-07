import './App.css'
import Router from './Components/Router'
import {createContext} from 'react'
import React, {  useState } from 'react';

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
