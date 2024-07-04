const { query } = require('express');

const authorizeUser = (data, user, res, next) => {
    console.log(user);
    console.log("start authorizeUser", user, data);
    if (user !== data) {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("pass authorizeUser");
};

module.exports = { authorizeUser };
