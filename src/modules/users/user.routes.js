import { Router } from "express";
import { addUser, login, logout } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/register", addUser);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
