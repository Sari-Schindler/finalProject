const { RegisterService } = require("../services/registerService.js");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerService = new RegisterService();

class RegisterController {
    async register(req, res, next) {
        try {
            console.log("registerController");

            // Ensure password exists in request body
            const { username, email, password } = req.body;
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }

            let existUsername = await registerService.getUsers({ username });
            let existEmail = await registerService.getUsers({ email });
            console.log("username:", existUsername, "useremail:", existEmail);

            if (existUsername.length || existEmail.length) {
                return res.status(409).json({ message: "Username or Email already exists" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const response = await registerService.addUser({ ...req.body, password: hashedPassword });
                
                //req.body.id = response.body.id;
                const token = jwt.sign(
                    { username: req.body.username, id: req.body.id, email: req.body.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.status(201).json({ id: response.userResult.id, token: token });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async existUser(req, res, next) {
        try {
            console.log("existUser func");
            const { username, email } = req.query;

            let existUsername = await registerService.getUsers({ username });
            let existEmail = await registerService.getUsers({ email });
            console.log("username", existUsername.length > 0, "email:", existEmail);

            const response = { username: false, email: false };
            if (existUsername.length) {
                res.status(200);
                response.username = true;
            }
            if (existEmail.length) {
                res.status(200);
                response.email = true;
            }
            if (!existUsername.length && !existEmail.length) {
                res.status(404);
            }
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json('internal server error');
        }
    }
}

module.exports = { RegisterController };
