const { query } = require('express');

const authorizeUser = (data, user, res, next) => {
    if (user !== data) {
        return res.status(403).json({ message: "Forbidden" });
    }
};

module.exports = { authorizeUser };
