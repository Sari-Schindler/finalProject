import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home"
import NotFound from "./NotFound";
import Risks from "./Risks";
import About from "./About";
import Try from "./Try";
import Login from "./Login";
import Register from "./Register";
import Debts from "./Debts";


const Router = () => {
    const currentPage = `home`;

    return (<>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={currentPage} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/debts" element={<Debts />} />
                <Route path="/home/about" element={<About />} />
                <Route path="/home/risks" element={<Risks />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
            
    </>)
};
export default Router;