import express, { Router } from "express";
import { registerUserHandler, updateUserHandler } from "../controller/user";

const userRouter: Router = express.Router();

userRouter.post("/user", registerUserHandler);
userRouter.put("/user", updateUserHandler);

export default userRouter