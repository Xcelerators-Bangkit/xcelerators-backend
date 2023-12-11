import express, { Router } from "express";
import { getUserDetailHandler, loginUserHandler, registerUserHandler, updateUserHandler } from "../controller/user.js";

const userRouter: Router = express.Router();

userRouter.post("/user", registerUserHandler);
userRouter.put("/user", updateUserHandler);
userRouter.post("/login", loginUserHandler);
userRouter.get("/user/:email", getUserDetailHandler);

export default userRouter