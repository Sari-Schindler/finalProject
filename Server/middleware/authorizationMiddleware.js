import { query } from "express";

const authorizeUser = (data, user,res, next) => {
    console.log(user);
    console.log("start autorizeUser", user,data)
    if (user !== data) {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("pass autorizeUser")
};



export { authorizeUser};