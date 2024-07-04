const express = require("express");
const { UsersController } = require('../controllers/userscontroller.js');
const { UsersService } = require("../services/usersService.js");
const { validateUserData, validate } = require("../middleware/validationMiddleware.js");
const { validationResult } = require("express-validator");
const { authorizeUser } = require("../middleware/authorizationMiddleware.js");

const usersRouter = express.Router();

const userscontroller = new UsersController();

usersRouter.get("/:id", userscontroller.getUserById);
usersRouter.get("/", userscontroller.getUsers);

usersRouter.get("/:id/posts", userscontroller.getUsersPosts);
usersRouter.get("/:id/albums", userscontroller.getUsersAlbums);
usersRouter.post("/", validateUserData, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
}, userscontroller.addUser);

usersRouter.delete("/:id", userscontroller.deleteUser);
usersRouter.use((req, res, next) => {
    authorizeUser(req.body.id, req.user.id, res);
    next();
});
usersRouter.put("/:id", validateUserData, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, userscontroller.updateUser);
usersRouter.get("/:id/todos", userscontroller.getUsersTodos);

module.exports = usersRouter;
