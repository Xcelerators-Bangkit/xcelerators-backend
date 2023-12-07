import express, { Router } from "express";
import { registerUserHandler } from "../controller/user";

const userRouter: Router = express.Router();

userRouter.post("/user", registerUserHandler);

export default userRouter