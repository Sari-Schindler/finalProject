import express from "express";
import { submitFormController } from "../controllers/submitFormController.js";

const router = express.Router();

router.post("/", submitFormController.submitForm);

export default router;
