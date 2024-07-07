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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/home" element={<Home />}>
          <Route path="debts" element={<Debts />} />
          <Route path="about" element={<About />} />
          <Route path="risks" element={<Risks />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News/>} />
          <Route path="displayusers" element={<DisplayUsers/>} />

        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
