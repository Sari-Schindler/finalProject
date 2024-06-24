import express from "express";
import { RegisterController } from '../controllers/registerController.js'
import { validateUserData } from "../middleware/validationMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";

const registerRouter = express.Router();

const registerController = new RegisterController()

registerRouter.get("/exist", registerController.existUser)

registerRouter.post("/",validateUserData,(req,res,next)=>validate(req,res,next), registerController.register)


 export default registerRouter;