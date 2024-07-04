import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Components/Home/Home";
import NotFound from "./NotFound";
import Risks from "./Risks/Risks";
import About from "./About/About";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Debts from "./Debts";
import Contact from './Contact/Contact'
import News from "./News/News";
import DisplayUsers from './DisplayUsers'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Registration route */}
        <Route path="/register" element={<Register />} />
        
        {/* Home route with nested routes for subpages */}
        <Route path="/home" element={<Home />}>
          <Route path="debts" element={<Debts />} />
          <Route path="about" element={<About />} />
          <Route path="risks" element={<Risks />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News/>} />
          <Route path="displayusers" element={<DisplayUsers/>} />

        </Route>
        
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
