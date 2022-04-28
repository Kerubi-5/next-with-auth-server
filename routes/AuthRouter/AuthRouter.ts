import express from "express";
const router = express.Router();
import { UserController } from "controllers";

router.post("/login", UserController.login);
router.post("/register", UserController.register);

export default router;
