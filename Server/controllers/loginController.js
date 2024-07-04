const { LoginService } = require("../services/loginService.js");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const loginService = new LoginService();

class LoginController {
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            let user = await loginService.login(email, password);
            console.log(user);
            if (user) {
                user = await loginService.getUserByEmail(email, user.id);
                user = user[0];
                console.log("token session");
                console.log("Token payload:", { id: user.id, username: user.username, email: user.email });
                const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 259200000 });
                res.status(200).json({ message: 'Login successful', token: token });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = { LoginController };
